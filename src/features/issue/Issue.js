import React, { Fragment } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Helmet } from "react-helmet";

import { GET_ISSUE } from "./getIssueQuery";
import CommentItem from "../../components/CommentItem";

const Issue = () => {
  let location = useLocation();
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_ISSUE, {
    variables: { url: location.pathname },
  });
  const comments = data?.resource?.comments?.nodes ?? [];

  return (
    <div className="px-5 pt-5">
      <Helmet>
        <title>GitHub Issues Navigator | Issue #{id}</title>
      </Helmet>
      <h1 className="text-xl text-center mb-4">Issue #{id}</h1>
      {loading && <h1>Loading...</h1>}
      {!loading && error && (
        <h1>Ops, something went wrong while fetching this issue</h1>
      )}
      {!loading && !error && (
        <Fragment>
          <article className="shadow-md mb-4 rounded-lg bg-gray-50">
            <div className="bg-blue-400 flex items-center p-4 rounded-t-lg text-white">
              <a
                href={data?.resource?.author?.url}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={data?.resource?.author?.avatarUrl}
                  className="rounded-full"
                  alt="Issue author"
                  width="60px"
                  height="60px"
                />
              </a>
              <a
                href={data?.resource?.author?.url}
                target="_blank"
                rel="noreferrer"
              >
                <p className="ml-2">{data?.resource?.author?.login}</p>
              </a>
            </div>
            <div className="bg-gray-50 p-4">
              <h1 className="mb-4 font-bold text-lg">
                <ReactMarkdown remarkPlugins={[gfm]}>
                  {data?.resource.title}
                </ReactMarkdown>
              </h1>
              <ReactMarkdown remarkPlugins={[gfm]}>
                {data?.resource.body}
              </ReactMarkdown>
            </div>
          </article>
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              author={comment.author.login}
              avatarUrl={comment.author.avatarUrl}
              body={comment.body}
              authorUrl={comment.author.url}
              isAuthor={comment.author.login === data.resource?.author?.login}
            />
          ))}
        </Fragment>
      )}
    </div>
  );
};

export default Issue;
