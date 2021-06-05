import { gql } from "@apollo/client";

export const GET_REPOSITORY_ISSUES = gql`
  query GetRepositoryIssues(
    $name: String!
    $login: String!
    $states: [IssueState!]
  ) {
    repositoryOwner(login: $login) {
      repository(name: $name) {
        issues(
          first: 25
          states: $states
          orderBy: { field: CREATED_AT, direction: DESC }
        ) {
          totalCount
          nodes {
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
`;
