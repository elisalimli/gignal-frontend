import { ApolloClient, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "apollo-link-context";
import { createUploadLink } from "apollo-upload-client";
import { NextPageContext } from "next";
import { PaginatedMessagesResponse } from "../generated/graphql";
// import { createFileLink } from './createFileLink';
// import createUploadLink from "../utils/createUploadLink";
import createWithApollo from "./createWithApollo";

const production = true;
const serverURL = production ? "192.168.99.100:8080" : "localhost:8080";
console.log(serverURL);

const httpLink = createUploadLink({ uri: `http://${serverURL}/graphql` });

const wsLink = process.browser
  ? new WebSocketLink({
      uri: `ws://${serverURL}/subscriptions`,
      options: {
        reconnect: true,
        lazy: true,
      },
    })
  : null;
let channelId = -1;

const createClient = (ctx: NextPageContext) => {
  console.log("ctx,", ctx?.req?.headers?.cookie);
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
    // uri: "http://localhost:4000/graphql",

    link: link as any,

    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            messages: {
              keyArgs: [],

              merge: (
                existing: PaginatedMessagesResponse | undefined,
                incoming: PaginatedMessagesResponse,
                { args }
              ): PaginatedMessagesResponse => {
                console.log(existing, incoming);
                if (incoming?.messages && existing?.messages) {
                  if (channelId > 0 && args.input.channelId !== channelId) {
                    channelId = args.input.channelId;

                    return incoming;
                  }
                  channelId = args.input.channelId;

                  const result =
                    (existing.messages.length - 1) / incoming.messages.length;

                  if (incoming.messages.length === 0) return existing;
                  if (existing.messages.length === 0) return incoming;
                  if (
                    incoming?.messages[0].__ref !== existing?.messages[0].__ref
                  ) {
                    return {
                      ...incoming,
                      messages: [...existing.messages, ...incoming.messages],
                    };
                  }
                  if (
                    incoming?.messages[0].__ref !== existing?.messages[0].__ref
                  ) {
                    return {
                      ...incoming,
                      messages: [...existing.messages, ...incoming.messages],
                    };
                  }
                  if (
                    incoming.messages.length * result ===
                    existing.messages.length - 1
                  ) {
                    return existing;
                  }

                  // return incoming;
                }
                if (!existing) {
                  return incoming;
                }

                return {
                  ...existing,
                  messages: [...incoming, ...(existing?.messages || [])],
                };
              },
            },
          },
        },
      },
    }),
  });
};

export const withApollo = createWithApollo(createClient);
