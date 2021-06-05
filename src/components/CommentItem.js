import React from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const CommentItem = ({ author, avatarUrl, body }) => {
  return (
    <article>
      <div>
        <img width="40px" height="40px" src={avatarUrl} alt="Comment author" />
        <p>{author}</p>
      </div>
      <ReactMarkdown remarkPlugins={[gfm]}>{body}</ReactMarkdown>
    </article>
  );
};

CommentItem.propTypes = {
  author: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default CommentItem;
