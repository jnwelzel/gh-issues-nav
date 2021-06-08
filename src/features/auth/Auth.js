import QueryString from "qs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import styles from "./Auth.module.css";
import { fetchUserAsync, selectUser } from "./authSlice";
import { ReactComponent as Icon } from "./github.svg";

const Auth = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const user = useSelector(selectUser);

  useEffect(() => {
    // After requesting Github access, Github redirects back to your app with a code parameter
    const queryObject = QueryString.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    // If Github API returns the code parameter
    if (queryObject.code) {
      const { code } = queryObject;

      dispatch(
        fetchUserAsync({
          proxyUrl: process.env.REACT_APP_PROXY_URL,
          gitHubCode: code,
        })
      );
    }
  }, [dispatch, history, location]);

  if (user) {
    window.location.href = "/";
  }
  return (
    <div className={styles.Auth}>
      <a
        className="rounded-lg bg-black text-white py-2 px-4 flex hover:bg-gray-800"
        href={`https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`}
      >
        <Icon className="mr-2" />
        Login with Github
      </a>
    </div>
  );
};

export default Auth;
