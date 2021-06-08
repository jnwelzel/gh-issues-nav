import React from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const CommentItem = ({ author, avatarUrl, body }) => {
  return (
    <article className="shadow-md mb-4 rounded-lg bg-gray-50">
      <div className="bg-gradient-to-r from-gray-400 to-gray-200 flex items-center p-4 rounded-t-lg text-white">
        <img
          className="rounded-full"
          width="40px"
          height="40px"
          src={avatarUrl}
          alt="Comment author"
        />
        <p className="ml-2 text-sm">{author}</p>
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
};

export default CommentItem;
