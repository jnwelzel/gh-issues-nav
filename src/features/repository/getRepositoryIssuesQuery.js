import { gql } from "@apollo/client";

// "repo:facebook/react state:open type:issue sort:created-desc in:title in:body"

export const GET_REPOSITORY_ISSUES = gql`
  query GetRepositoryIssues($query: String!) {
    search(first: 25, type: ISSUE, query: $query) {
      nodes {
        ... on Issue {
          id
          title
          number
          comments {
            totalCount
          }
        }
      }
      issueCount
    }
  }
`;
