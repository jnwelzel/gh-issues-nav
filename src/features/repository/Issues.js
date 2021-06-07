import { useQuery } from "@apollo/client";
import throttle from "lodash/throttle";
import React, { useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import IssueItem from "../../components/IssueItem";
import AppContext from "../../contexts/AppContext";
import { GET_REPOSITORY_ISSUES } from "./getRepositoryIssuesQuery";
import { IssuesForm } from "./IssuesForm";
import {
  selectRepoLogin,
  selectRepoName,
  selectSearch,
  selectState,
} from "./repositorySlice";

const onLoadMore = throttle((endCursor, hasNextPage, loading, fetchMore) => {
  if (hasNextPage && !loading) {
    fetchMore({
      variables: {
        cursor: endCursor,
      },
    });
  }
}, 2000);

export const Issues = () => {
  const repoLogin = useSelector(selectRepoLogin);
  const repoName = useSelector(selectRepoName);
  const issuesState = useSelector(selectState);
  const search = useSelector(selectSearch);
  const { loading, error, data, fetchMore } = useQuery(GET_REPOSITORY_ISSUES, {
    variables: {
      query: `repo:${repoLogin}/${repoName} state:${issuesState} type:issue sort:created-desc in:title in:body ${search}`,
      cursor: null,
    },
  });
  const footerObserver = useRef();
  const { footerRef } = useContext(AppContext);
  const hasNextPage = data?.search?.pageInfo?.hasNextPage;
  const endCursor = data?.search?.pageInfo?.endCursor;
  const issues = data?.search?.edges ?? [];
  const totalCount = data?.search?.issueCount ?? 0;
  useEffect(() => {
    const footerNode = footerRef.current;
    if ("IntersectionObserver" in window) {
      footerObserver.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          onLoadMore(endCursor, hasNextPage, loading, fetchMore);
        }
      });
    }

    footerObserver.current.observe(footerNode);

    return () => {
      if (footerObserver.current) {
        footerObserver.current.unobserve(footerNode);
      }
    };
  }, [footerRef, endCursor, hasNextPage, loading, fetchMore]);

  return (
    <React.Fragment>
      <h2>Issues ({totalCount})</h2>
      <IssuesForm />
      {loading && <h2>Loading issues...</h2>}
      {error && <h2>Ops, something went wrong while fetching the issues :(</h2>}
      {!error && issues.length === 0 && !loading && (
        <h2>Repository not found</h2>
      )}
      {issues.length > 0 &&
        issues.map(({ node }) => (
          <IssueItem
            key={node.id}
            title={node.title}
            number={node.number}
            totalComments={node.comments.totalCount}
            owner={repoLogin}
            repo={repoName}
          />
        ))}
    </React.Fragment>
  );
};
