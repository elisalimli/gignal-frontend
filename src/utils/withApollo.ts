import { ApolloClient, InMemoryCache, split, createHttpLink } from '@apollo/client';
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "apollo-link-context";
import { createUploadLink } from 'apollo-upload-client';
import { NextPageContext } from "next";
// import { createFileLink } from './createFileLink';
// import createUploadLink from "../utils/createUploadLink";
import createWithApollo from "./createWithApollo";

const httpLink = createUploadLink({ uri: "http://localhost:4000/graphql" });

const wsLink = process.browser
  ? new WebSocketLink({
    uri: `ws://localhost:4000/subscriptions`,

    options: {
      reconnect: true,
      lazy: true,
    },
  })
  : null;

const createClient = (ctx: NextPageContext) => {
  const middlewareLink = setContext(() => ({
    credentials: "include",
    headers: {
      cookie:
        typeof window === "undefined" ? ctx?.req?.headers.cookie : undefined,
    },
  }));

  const httpLinkWithMiddleware = middlewareLink.concat(httpLink as any);

  const link = process.browser
    ? split(
      ({ query }) => {
        const def = getMainDefinition(query);
        return (
          def.kind === "OperationDefinition" &&
          def.operation === "subscription"
        );
      },
      wsLink,
      httpLinkWithMiddleware as any
    )
    : httpLinkWithMiddleware;

  return new ApolloClient({
    uri: "http://localhost:4000/graphql",
    link: link as any,
    cache: new InMemoryCache(),
  });
};

export const withApollo = createWithApollo(createClient);
