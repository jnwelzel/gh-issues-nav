import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Repository.module.css";
import {
  selectRepoName,
  selectRepoLogin,
  selectState,
  setRepoInfo,
  setIssuesState,
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

  const [loginValue, setLoginValue] = useState(repoLogin);
  const [nameValue, setNameValue] = useState(repoName);
  const { loading, error, data } = useQuery(GET_REPOSITORY_ISSUES, {
    variables: { name: repoName, login: repoLogin, states: [issuesState] },
  });
  const [isEditing, setIsEditing] = useState(false);

  const onSubmitRepository = (e) => {
    e.preventDefault();

    const login = loginValue.trim();
    const name = nameValue.trim();

    if (!login || !name) {
      // TODO Validation
      return;
    }
    // TODO Check if repo exists at: login/name,
    // then dispatch
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

  const issues = data?.repositoryOwner?.repository?.issues?.nodes;

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
              <button type="submit">Ok</button>
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
          <h2>Issues</h2>
          <div>State</div>
          <div>
            <input
              type="radio"
              id="open"
              name="state"
              value="OPEN"
              checked={issuesState === "OPEN"}
              onChange={onChangeIssuesState}
            />
            <label htmlFor="open">OPEN</label>
          </div>
          <div>
            <input
              type="radio"
              id="closed"
              name="state"
              value="CLOSED"
              checked={issuesState === "CLOSED"}
              onChange={onChangeIssuesState}
            />
            <label htmlFor="closed">CLOSED</label>
          </div>
          {loading && <h2>Loading issues...</h2>}
          {error && (
            <h2>Ops, something went wrong while fetching the issues :(</h2>
          )}
          {issues &&
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
