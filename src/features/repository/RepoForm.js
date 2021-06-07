import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRepoLogin,
  selectRepoName,
  setRepoInfo,
} from "./repositorySlice";

const RepoForm = (props) => {
  const dispatch = useDispatch();
  const repoLogin = useSelector(selectRepoLogin);
  const repoName = useSelector(selectRepoName);
  const [isEditing, setIsEditing] = useState(false);
  const [loginValue, setLoginValue] = useState(repoLogin);
  const [nameValue, setNameValue] = useState(repoName);

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

  return (
    <React.Fragment>
      <h1>Choose a repo</h1>
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
    </React.Fragment>
  );
};

export default RepoForm;
