import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import styles from "./Repository.module.css";
import {
  selectRepoName,
  selectRepoLogin,
  selectState,
  setIssuesState,
  selectSearch,
  setSearch,
} from "./repositorySlice";
import { GET_REPOSITORY_ISSUES } from "./getRepositoryIssuesQuery";
import IssueItem from "../../components/IssueItem";
import AppContext from "../../contexts/AppContext";
import throttle from "lodash/throttle";
import RepoForm from "./RepoForm";

const onLoadMore = throttle((endCursor, hasNextPage, loading, fetchMore) => {
  if (hasNextPage && !loading) {
    fetchMore({
      variables: {
        cursor: endCursor,
      },
    });
  }
}, 2000);

const Repository = () => {
  const dispatch = useDispatch();
  const repoLogin = useSelector(selectRepoLogin);
  const repoName = useSelector(selectRepoName);
  const issuesState = useSelector(selectState);
  const search = useSelector(selectSearch);

  const [searchValue, setSearchValue] = useState(search);
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
  const issues = data?.search?.edges || [];
  const totalCount = data?.search?.issueCount || 0;

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

  const onChangeIssuesState = (e) => {
    dispatch(setIssuesState(e.target.value));
  };

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const onSubmitSearch = (e) => {
    e.preventDefault();
    const value = searchValue.trim();
    dispatch(setSearch(value));
  };

  return (
    <Fragment>
      <div className={styles.Repository}>
        <main>
          <RepoForm />
          <h2>Issues ({totalCount})</h2>
          <p>State</p>
          <div>
            <input
              type="radio"
              id="open"
              name="state"
              value="open"
              checked={issuesState === "open"}
              onChange={onChangeIssuesState}
            />
            <label htmlFor="open">Open</label>
          </div>
          <div>
            <input
              type="radio"
              id="closed"
              name="state"
              value="closed"
              checked={issuesState === "closed"}
              onChange={onChangeIssuesState}
            />
            <label htmlFor="closed">Closed</label>
          </div>
          <p>Search</p>
          <form onSubmit={onSubmitSearch}>
            <input
              type="search"
              name="search"
              id="search"
              onChange={onChangeSearch}
            />
            <button type="submit">Search</button>
          </form>
          {loading && <h2>Loading issues...</h2>}
          {error && (
            <h2>Ops, something went wrong while fetching the issues :(</h2>
          )}
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
        </main>
      </div>
    </Fragment>
  );
};

export default Repository;
