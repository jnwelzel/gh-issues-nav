import React from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import classnames from "classnames";

const CommentItem = ({ author, avatarUrl, body, authorUrl, isAuthor }) => {
  return (
    <article className="shadow-md mb-4 rounded-lg bg-gray-50">
      <div
        className={classnames(
          "flex items-center p-4 rounded-t-lg text-white bg-gray-400",
          { "bg-blue-400": isAuthor }
        )}
      >
        <a
          href={authorUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center"
        >
          <img
            className="rounded-full"
            width="40px"
            height="40px"
            src={avatarUrl}
            alt="Comment author"
          />
          <p className="ml-2 text-sm">{author}</p>
        </a>
      </div>
      <ReactMarkdown className="p-4 text-sm" remarkPlugins={[gfm]}>
        {body}
      </ReactMarkdown>
    </article>
  );
};

CommentItem.propTypes = {
  author: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  authorUrl: PropTypes.string.isRequired,
};

export default CommentItem;
