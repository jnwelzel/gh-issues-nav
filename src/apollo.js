import { ApolloClient, InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

const token = JSON.parse(localStorage.getItem("user")).access_token;
export const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          search: relayStylePagination(["query"]),
        },
      },
    },
  }),
  headers: {
    Authorization: `bearer ${token}`,
  },
});
