import { gql } from "@apollo/client";

export const GET_REPOSITORY_ISSUES = gql`
  query GetRepositoryIssues($name: String!, $login: String!) {
    repositoryOwner(login: $login) {
      repository(name: $name) {
        issues(
          first: 25
          states: OPEN
          orderBy: { field: CREATED_AT, direction: DESC }
        ) {
          edges {
            node {
              id
              title
              number
              comments {
                totalCount
              }
            }
          }
        }
      }
    }
  }
`;
