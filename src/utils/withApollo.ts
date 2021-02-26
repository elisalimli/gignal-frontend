import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "apollo-link-context";
// import { PaginatedPosts, Subscription } from '../generated/graphql';
import { NextPageContext } from "next";
import createWithApollo from "./createWithApollo";

const createClient = (ctx: NextPageContext) => {
  // const httpLink = createHttpLink({
  //   uri: "http://localhost:4000/graphql",
  //   credentials: "include",

  //   headers: {
  //     cookie:
  //       typeof window === "undefined" ? ctx?.req?.headers.cookie : undefined,
  //   },
  // });

  // const wsLink =
  //   typeof window === "undefined"
  //     ? httpLink
  //     : new WebSocketLink({
  //         uri: "ws://localhost:4000/graphql",
  //         options: {
  //           reconnect: true,
  //         },
  //       });
  // const httpLink = createHttpLink({yarn
  //   uri: "http://localhost:4000/graphql",
  //   credentials: "include",

  //   headers: {
  //     cookie:
  //       typeof window === "undefined" ? ctx?.req?.headers.cookie : undefined,
  //   },
  // });

  // const middlewareLink = setContext(() => ({
  //   credentials: "include",
  //   headers: {
  //     cookie:
  //       typeof window === "undefined" ? ctx?.req?.headers.cookie : undefined,
  //   },
  // }));

  // const httpLinkWithMiddleware = middlewareLink.concat(httpLink);

  // const link = split(
  //   ({ query }) => {
  //     const { kind, operation } = getMainDefinition(query);
  //     return kind === "OperationDefinition" && operation === "subscription";
  //   },
  //   wsLink,
  //   httpLinkWithMiddleware
  // );

  // return new ApolloClient({
  //   uri: "http://localhost:4000/graphql",
  //   link: wsLink,

  //   cache: new InMemoryCache(),
  // });
  const httpLink = createHttpLink({ uri: "http://localhost:4000/graphql" });

  const middlewareLink = setContext(() => ({
    credentials: "include",
    headers: {
      cookie:
        typeof window === "undefined" ? ctx?.req?.headers.cookie : undefined,
    },
  }));

  const httpLinkWithMiddleware = middlewareLink.concat(httpLink);
  const cookie = ctx?.req?.headers.cookie;

  const wsLink = process.browser
    ? new WebSocketLink({
        uri: `ws://localhost:4000/subscriptions`,

        options: {
          reconnect: true,
        },
      })
    : null;

  const link = process.browser
    ? split(
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query);
          return kind === "OperationDefinition" && operation === "subscription";
        },
        wsLink,
        httpLinkWithMiddleware
      )
    : httpLinkWithMiddleware;

  return new ApolloClient({
    uri: "http://localhost:4000/graphql",
    link,
    cache: new InMemoryCache(),
  });
};

export const withApollo = createWithApollo(createClient);
