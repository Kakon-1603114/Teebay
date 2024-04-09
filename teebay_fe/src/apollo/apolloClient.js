import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { BASE_URL } from "../config";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, Code: ${extensions.code}`
      );
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);

    if (networkError.statusCode === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = createHttpLink({
  uri: BASE_URL + "/graphql",
});

const link = from([authLink, httpLink, errorLink]);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default client;
