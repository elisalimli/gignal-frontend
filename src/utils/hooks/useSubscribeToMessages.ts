import { NewMessageAddedDocument } from "../../generated/graphql";

export const useSubscribeToMessages = (subscribeToMore, id) => {
  return subscribeToMore({
    document: NewMessageAddedDocument,
    variables: { channelId: id },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) {
        return prev;
      }
      const newMessage = subscriptionData.data.newMessageAdded;
      return {
        ...prev.messages,
        messages: [newMessage, ...prev.messages.messages],
      };
    },
  });
};
