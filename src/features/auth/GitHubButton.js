import React from "react";
import classnames from "classnames";

import { ReactComponent as GitHubIcon } from "./github.svg";

export const GitHubButton = ({ className, ...rest }) => {
  return (
    <a
      className={classnames(
        className,
        "ring ring-black ring-opacity-30 hover:ring-opacity-70 rounded-full bg-gray-800 text-white py-2 px-4 flex hover:bg-black z-10 max-w-max"
      )}
      href={`https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`}
      {...rest}
    >
      <GitHubIcon className="mr-2" />
      Login with Github
    </a>
  );
};
