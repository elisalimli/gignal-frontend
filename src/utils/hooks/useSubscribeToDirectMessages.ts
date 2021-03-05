import {
  NewDirectMessageAddedDocument,
  NewDirectMessageAddedSubscriptionVariables,
} from "../../generated/graphql";

export const useSubscribeTodDirectMessages = (subscribeToMore, input) => {
  return subscribeToMore({
    document: NewDirectMessageAddedDocument,
    variables: {
      input: { receiverId: input.receiverId, teamId: input.teamId },
    },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) {
        return prev;
      }

      return {
        __typename: "Query",
        directMessages: [
          ...prev.directMessages,
          subscriptionData.data.newDirectMessageAdded,
        ],
      };
    },
  });
};
