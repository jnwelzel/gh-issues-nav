import { gql } from "@apollo/client";

export const GET_ISSUE = gql`
  query GetIssue($url: URI!) {
    resource(url: $url) {
      ... on Issue {
        id
        author {
          avatarUrl(size: 64)
          login
        }
        body
        title
        comments(last: 100) {
          nodes {
            author {
              login
              avatarUrl(size: 64)
            }
            body
            id
          }
        }
      }
    }
  }
`;
