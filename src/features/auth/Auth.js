import QueryString from "qs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { fetchUserAsync, selectUser } from "./authSlice";
import { ReactComponent as GitHubIcon } from "./github.svg";
import { ReactComponent as ShieldIllustration } from "./shield.svg";
import { ArrowRightIcon } from "@heroicons/react/outline";

const Auth = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const user = useSelector(selectUser);

  useEffect(() => {
    // After requesting Github access, Github redirects back to us with a code parameter
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
    <div className="flex">
      <div className="bg-blue-500 flex w-2/4 h-screen items-start pr-10 overflow-hidden relative">
        <ArrowRightIcon className="transform-gpu -translate-y-1/2 w-40 text-white top-1/2 -right-20 absolute" />
        <ShieldIllustration className="max-w-md z-0" />
      </div>
      <div className="flex items-center justify-center w-2/4 relative overflow-hidden">
        <ArrowRightIcon className="transform-gpu -translate-y-1/2 w-40 text-blue-500 top-1/2 -left-16 absolute" />
        <a
          className="rounded-lg bg-gray-800 text-white py-2 px-4 flex hover:bg-black z-10"
          href={`https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`}
        >
          <GitHubIcon className="mr-2" />
          Login with Github
        </a>
      </div>
    </div>
  );
};

export default Auth;
