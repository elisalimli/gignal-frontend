import { ApolloCache } from "@apollo/client";
import gql from "graphql-tag";
import {
  CreateDirectMessageMutation,
  RegularMemberUserSnippetFragment,
  TeamSnippetFragmentDoc,
  TeamSnippetFragment,
} from "../generated/graphql";

export const updateCacheAfterDirectMessage = (
  teamId: number,
  receiverId: number,
  cache: ApolloCache<CreateDirectMessageMutation>,
  member: RegularMemberUserSnippetFragment
) => {
  const id = `Team:${teamId}`;
  const dataFragment = cache.readFragment({
    id,
    fragment: TeamSnippetFragmentDoc,
    fragmentName: "TeamSnippet",
  }) as TeamSnippetFragment;

  let isExist = false;
  dataFragment.directMessagesMembers.forEach((dm) => {
    const isTrue = dm.id === receiverId;
    if (isTrue) isExist = isTrue;
  });

  if (isExist) return;

  const newDirectMessagesMembers = [
    ...dataFragment?.directMessagesMembers,
    member,
  ];

  cache.writeFragment({
    id,
    fragment: gql`
      fragment __ on Team {
        id
        directMessagesMembers
      }
    `,
    data: { directMessagesMembers: newDirectMessagesMembers },
  });
};
