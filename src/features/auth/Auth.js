import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import styles from "./Auth.module.css";
import { fetchUserAsync } from "./authSlice";

const Auth = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // After requesting Github access, Github redirects back to your app with a code parameter
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    // If Github API returns the code parameter
    if (hasCode) {
      const newUrl = url.split("?code=");
      window.history.pushState({}, null, newUrl[0]);

      dispatch(
        fetchUserAsync({
          proxyUrl: process.env.REACT_APP_PROXY_URL,
          gitHubCode: newUrl[1],
        })
      );
    }
  }, [dispatch]);

  return (
    <div className={styles.Auth}>
      <a
        href={`https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`}
      >
        Login with Github
      </a>
    </div>
  );
};

export default Auth;
