import React from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { ChatAltIcon } from "@heroicons/react/outline";

import { Link } from "react-router-dom";

const IssueItem = ({ title, number, totalComments, owner, repo }) => {
  const resourceUrl = `/${owner}/${repo}/issues/${number}`;
  return (
    <div className="flex flex-col text-left shadow-md mb-4 rounded-lg mx-5 bg-gray-50">
      <div className="flex">
        <div className="pt-3 pl-3">
          <Link to={resourceUrl}>
            <ReactMarkdown remarkPlugins={[gfm]}>{title}</ReactMarkdown>
          </Link>
        </div>
        <div className="flex items-center ml-auto pr-3 pt-3">
          <Link to={resourceUrl} className="flex items-center">
            <ChatAltIcon className="w-5 mr-2" />
            {totalComments}
          </Link>
        </div>
      </div>
      <div className="pt-1 pl-3 pb-3 text-xs text-gray-500">#{number}</div>
    </div>
  );
};

IssueItem.propTypes = {
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  repo: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  totalComments: PropTypes.number.isRequired,
};

export default IssueItem;
