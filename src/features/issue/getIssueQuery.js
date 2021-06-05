import { gql } from "@apollo/client";

export const GET_ISSUE = gql`
  query GetIssue($url: URI!) {
    resource(url: $url) {
      ... on Issue {
        id
        comments(last: 100) {
          nodes {
            author {
              login
              avatarUrl(size: 64)
            }
            bodyHTML
          }
        }
        author {
          avatarUrl(size: 64)
          login
        }
        bodyHTML
        title
      }
    }
  }
`;
