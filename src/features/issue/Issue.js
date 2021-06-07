import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Template from "../../Template";
import { GET_ISSUE } from "./getIssueQuery";
import CommentItem from "../../components/CommentItem";

const Issue = () => {
  let location = useLocation();
  const { loading, error, data } = useQuery(GET_ISSUE, {
    variables: { url: location.pathname },
  });
  const comments = data?.resource?.comments?.nodes || [];

  return (
    <Template>
      <img
        src={data?.resource?.author?.avatarUrl}
        alt="Issue author"
        width="60px"
        height="60px"
      />
      <p>{data?.resource?.author?.login}</p>
      <article>
        <h1>
          <ReactMarkdown remarkPlugins={[gfm]}>
            {data?.resource.title}
          </ReactMarkdown>
        </h1>
        <ReactMarkdown remarkPlugins={[gfm]}>
          {data?.resource.body}
        </ReactMarkdown>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            author={comment.author.login}
            avatarUrl={comment.author.avatarUrl}
            body={comment.body}
          />
        ))}
      </article>
    </Template>
  );
};

export default Issue;
