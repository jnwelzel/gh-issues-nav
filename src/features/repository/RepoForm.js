import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRepoLogin,
  selectRepoName,
  setRepoInfo,
} from "./repositorySlice";
import { PencilIcon, SaveIcon } from "@heroicons/react/outline";

const RepoForm = () => {
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
      <h1 className="my-5 text-xl">Choose a repo</h1>
      {isEditing && (
        <form
          onSubmit={onSubmitRepository}
          className="flex items-center justify-center"
        >
          <input
            autoComplete="off"
            type="text"
            name="login"
            placeholder="facebook"
            value={loginValue}
            onChange={onChangeLogin}
            className="mt-0 w-auto px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
          />
          <div className="w-10">/</div>
          <input
            autoComplete="off"
            type="text"
            name="name"
            placeholder="react"
            value={nameValue}
            onChange={onChangeName}
            className="mt-0 w-auto px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
          />
          <button
            type="submit"
            className="flex items-center bg-green-500 hover:bg-green-600 rounded-lg py-2 px-4 text-white ml-4"
          >
            <SaveIcon className="w-5 mr-2" /> Save
          </button>
        </form>
      )}
      {!isEditing && (
        <div className="flex items-center justify-center">
          <div className="mr-4">{`${repoLogin}/${repoName}`}</div>
          <button
            className="flex items-center bg-blue-500 hover:bg-blue-600 rounded-lg py-2 px-4 text-white"
            type="button"
            onClick={onClickEdit}
          >
            <PencilIcon className="w-5 mr-2" /> Edit
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

export default RepoForm;
