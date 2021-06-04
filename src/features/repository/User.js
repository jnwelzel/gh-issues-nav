import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import Template from "../../Template";

import styles from "./User.module.css";
import { selectUserOrg, setUserOrg } from "./userSlice";

const User = () => {
  const { user } = useParams();
  const userOrg = useSelector(selectUserOrg);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    if (user && !userOrg) {
      dispatch(setUserOrg(user));
    }
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      dispatch(setUserOrg(inputValue));
    }
  };

  const onChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const repoName = "react";
  if (userOrg && repoName) {
    return <Redirect to={`/${userOrg}/${repoName}/`} />;
  }

  return (
    <Template>
      <div className={styles.User}>
        <header>
          <h1>2. Choose a repository</h1>
        </header>
        <main>
          <h2>{user}</h2>
          <form onSubmit={onSubmitHandler}>
            <input
              type="search"
              name="repo"
              placeholder="react"
              value={inputValue}
              onChange={onChangeHandler}
            />
            <button type="submit">Ok</button>
          </form>
        </main>
      </div>
    </Template>
  );
};

export default User;
