import QueryString from "qs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

import { fetchUserAsync, selectUser } from "./authSlice";
import { ReactComponent as ShieldIllustration } from "./shield.svg";
import { ArrowRightIcon } from "@heroicons/react/outline";
import { ArrowUpIcon } from "@heroicons/react/outline";
import { GitHubButton } from "./GitHubButton";

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
    if (queryObject?.code) {
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
      <Helmet>
        <title>GitHub Issues Navigator | Login</title>
      </Helmet>
      <div className="bg-blue-500 flex flex-col md:flex-row w-full md:w-2/4 h-screen items-center md:items-start overflow-hidden relative">
        <ArrowRightIcon className="transform-gpu -translate-y-1/2 hidden md:block md:w-40 text-white top-1/2 -right-20 absolute" />
        <ArrowUpIcon className="transform-gpu -translate-x-1/2 left-1/2 w-40 md:hidden text-white -bottom-16 absolute" />
        <ShieldIllustration className="max-w-md z-0" />
        <ArrowRightIcon className="transform-gpu -translate-y-1/2 w-40 hidden md:block text-blue-500 top-1/2 -left-16 absolute" />
        <GitHubButton className="md:hidden" />
        <div className="font-bold text-white uppercase md:hidden mt-auto mb-24">
          GitHub Issues Navigator
        </div>
        <div className="hidden md:flex absolute transform-gpu -translate-y-1/2 top-1/2 w-full items-center justify-center">
          <h2 className="text-white w-23">
            Explore GitHub issues using the power of{" "}
            <strong className="text-green-300">GraphQL</strong>.
          </h2>
        </div>
      </div>
      <div className="items-center hidden md:flex md:w-2/4 justify-center relative overflow-hidden">
        <div className="fixed top-0">
          <p className="text-4xl mt-48">
            <span className="font-bold text-blue-500">G</span>itHub
          </p>
          <p className="text-4xl">
            <span className="font-bold text-blue-500">&nbsp;I</span>ssues
          </p>
          <p className="text-4xl">
            <span className="font-bold text-blue-500">N</span>avigator
          </p>
        </div>
        <ArrowRightIcon className="transform-gpu -translate-y-1/2 w-40 text-blue-500 top-1/2 -left-16 absolute" />
        <GitHubButton />
      </div>
    </div>
  );
};

export default Auth;
