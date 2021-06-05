import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Repository.module.css";
import {
  selectRepoName,
  selectRepoLogin,
  setRepoInfo,
} from "./repositorySlice";
import Template from "../../Template";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY_ISSUES } from "./getRepositoryIssuesQuery";

function Repository() {
  const dispatch = useDispatch();
  const repoLogin = useSelector(selectRepoLogin);
  const repoName = useSelector(selectRepoName);
  const [loginValue, setLoginValue] = useState("facebook");
  const [nameValue, setNameValue] = useState("react");
  const { loading, error, data } = useQuery(GET_REPOSITORY_ISSUES, {
    variables: { name: repoName, login: repoLogin },
  });

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
  };

  const onChangeLogin = (e) => {
    setLoginValue(e.target.value);
  };

  const onChangeName = (e) => {
    setNameValue(e.target.value);
  };

  const onClickEdit = () => {
    dispatch(setRepoInfo({ name: null, login: null }));
  };

  const isValidRepo = repoLogin && repoName;

  return (
    <Template>
      <div className={styles.Repository}>
        <header>
          <h1>Choose a repo</h1>
        </header>
        <main>
          {!isValidRepo && (
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
          {isValidRepo && (
            <div>
              {`${repoLogin}/${repoName}`}
              <button type="button" onClick={onClickEdit}>
                Edit
              </button>
            </div>
          )}
        </main>
      </div>
    </Template>
  );
}

export default Repository;
