import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Repository.module.css";
import {
  selectRepoName,
  selectRepoLogin,
  selectState,
  setRepoInfo,
  setIssuesState,
  selectSearch,
  setSearch,
} from "./repositorySlice";
import Template from "../../Template";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY_ISSUES } from "./getRepositoryIssuesQuery";
import IssueItem from "../../components/IssueItem";

function Repository() {
  const dispatch = useDispatch();
  const repoLogin = useSelector(selectRepoLogin);
  const repoName = useSelector(selectRepoName);
  const issuesState = useSelector(selectState);
  const search = useSelector(selectSearch);

  const [loginValue, setLoginValue] = useState(repoLogin);
  const [nameValue, setNameValue] = useState(repoName);
  const [searchValue, setSearchValue] = useState(search);
  const { loading, error, data } = useQuery(GET_REPOSITORY_ISSUES, {
    variables: {
      query: `repo:${repoLogin}/${repoName} state:${issuesState} type:issue sort:created-desc in:title in:body ${search}`,
    },
  });
  const [isEditing, setIsEditing] = useState(false);

  const onSubmitRepository = (e) => {
    e.preventDefault();

    const login = loginValue.trim();
    const name = nameValue.trim();

    if (!login || !name) {
      // TODO Show UI message
      return;
    }

    dispatch(setRepoInfo({ login, name }));
    setIsEditing(false);
  };

  const onChangeLogin = (e) => {
    setLoginValue(e.target.value);
  };

  const onChangeName = (e) => {
    setNameValue(e.target.value);
  };

  const onClickEdit = () => {
    setIsEditing(true);
  };

  const onChangeIssuesState = (e) => {
    dispatch(setIssuesState(e.target.value));
  };

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const onSubmitSearch = (e) => {
    e.preventDefault();
    const value = searchValue.trim();
    dispatch(setSearch(value));
  };

  const issues = data?.search?.nodes || [];
  const totalCount = data?.search?.issueCount || 0;

  return (
    <Template>
      <div className={styles.Repository}>
        <header>
          <h1>Choose a repo</h1>
        </header>
        <main>
          {isEditing && (
            <form onSubmit={onSubmitRepository}>
              <input
                type="text"
                name="login"
                placeholder="facebook"
                value={loginValue}
                onChange={onChangeLogin}
              />
              <input
                type="text"
                name="name"
                placeholder="react"
                value={nameValue}
                onChange={onChangeName}
              />
              <button type="submit">Save</button>
            </form>
          )}
          {!isEditing && (
            <div>
              {`${repoLogin}/${repoName}`}
              <button type="button" onClick={onClickEdit}>
                Edit
              </button>
            </div>
          )}
          <h2>Issues ({totalCount})</h2>
          <p>State</p>
          <div>
            <input
              type="radio"
              id="open"
              name="state"
              value="open"
              checked={issuesState === "open"}
              onChange={onChangeIssuesState}
            />
            <label htmlFor="open">Open</label>
          </div>
          <div>
            <input
              type="radio"
              id="closed"
              name="state"
              value="closed"
              checked={issuesState === "closed"}
              onChange={onChangeIssuesState}
            />
            <label htmlFor="closed">Closed</label>
          </div>
          <p>Search</p>
          <form onSubmit={onSubmitSearch}>
            <input
              type="search"
              name="search"
              id="search"
              onChange={onChangeSearch}
            />
            <button type="submit">Search</button>
          </form>
          {loading && <h2>Loading issues...</h2>}
          {error && (
            <h2>Ops, something went wrong while fetching the issues :(</h2>
          )}
          {issues.length === 0 && !loading && <h2>Repository not found</h2>}
          {issues.length > 0 &&
            issues.map((issue) => (
              <IssueItem
                key={issue.id}
                title={issue.title}
                number={issue.number}
                totalComments={issue.comments.totalCount}
              />
            ))}
        </main>
      </div>
    </Template>
  );
}

export default Repository;
