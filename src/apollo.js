import { ApolloClient, InMemoryCache } from "@apollo/client";

const token = JSON.parse(localStorage.getItem("user")).access_token;
export const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `bearer ${token}`,
  },
});
