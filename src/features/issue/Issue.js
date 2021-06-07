import React, { Fragment } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_ISSUE } from "./getIssueQuery";
import CommentItem from "../../components/CommentItem";

const Issue = () => {
  let location = useLocation();
  const { id } = useParams;
  const { loading, error, data } = useQuery(GET_ISSUE, {
    variables: { url: location.pathname },
  });
  const comments = data?.resource?.comments?.nodes ?? [];

  return (
    <Fragment>
      <h1>Issue #{id}</h1>
      {loading && <h1>Loading issue data...</h1>}
      {!loading && error && (
        <h1>Ops, something went wrong while fetching this issue</h1>
      )}
      {!loading && !error && (
        <Fragment>
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
        </Fragment>
      )}
    </Fragment>
  );
};

export default Issue;
