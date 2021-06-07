import { gql } from "@apollo/client";

export const GET_REPOSITORY_ISSUES = gql`
  query GetRepositoryIssues($query: String!, $cursor: String) {
    search(first: 25, after: $cursor, type: ISSUE, query: $query) {
      edges {
        node {
          ... on Issue {
            id
            title
            number
            comments {
              totalCount
            }
          }
        }
        cursor
      }
      issueCount
      pageInfo {
        startCursor
        hasNextPage
        endCursor
        hasPreviousPage
      }
    }
  }
`;
