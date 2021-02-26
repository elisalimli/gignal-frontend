import React, { useEffect, useRef } from "react";
import { useSubscribeToMessages } from "../../../hooks/useSubscribeToMessages";
import {
  ChannelsSnippetFragment,
  MessageSnippetFragment,
  NewMessageAddedDocument,
  useMeQuery,
  useMessagesQuery,
  useNewMessageAddedSubscription,
} from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import Message from "../Message/Message";
import Loading from "../utils/Loading";
import { useScrollToBottom } from "../../../hooks/useScrollToBottom";

interface Props {
  channel: ChannelsSnippetFragment;
}
const Messages: React.FC<Props> = ({ channel: { id } }) => {
  const { data, loading, subscribeToMore } = useMessagesQuery({
    variables: { channelId: id },
    fetchPolicy: "network-only",
  });
  const { data: meData, loading: meLoading } = useMeQuery();
  useNewMessageAddedSubscription({
    variables: { channelId: id },
  });
  useEffect(() => {
    const unsub = useSubscribeToMessages(subscribeToMore, id);
    return () => {
      unsub();
    };
  }, [id]);
  useEffect(() => useScrollToBottom(chatContainer), [data]);

  const chatContainer = useRef(null);

  if (loading || meLoading) return <Loading />;

  return (
    <div ref={chatContainer} className="messages p-6">
      {data?.messages.map((m: MessageSnippetFragment) => (
        <Message
          isCreator={m.creator.id === meData?.me?.id}
          key={`${m.id}-message`}
          message={m}
        />
      ))}
    </div>
  );
};

export default withApollo({ ssr: false })(Messages);
