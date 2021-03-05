import { NewMessageAddedDocument } from "../../generated/graphql";

export const useSubscribeToMessages = (subscribeToMore, id) => {
  return subscribeToMore({
    document: NewMessageAddedDocument,
    variables: { channelId: id },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) {
        return prev;
      }

      return {
        __typename: "Query",
        messages: [...prev.messages, subscriptionData.data.newMessageAdded],
      };
    },
  });
};
