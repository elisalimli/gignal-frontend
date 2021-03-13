import React, { useEffect } from "react";
import {
  ChannelsSnippetFragment,
  useMeQuery,
  useMessagesQuery,
  useNewMessageAddedSubscription,
} from "../../generated/graphql";
import { useSubscribeToMessages } from "../../utils/hooks/useSubscribeToMessages";
import Loading from "../utils/Loading";
import RegularMessagesWrapper from "./RegularMessagesWrapper";

interface Props {
  channel: ChannelsSnippetFragment;
}
const Messages: React.FC<Props> = ({ channel: { id } }) => {
  const { data, loading, subscribeToMore, error } = useMessagesQuery({
    variables: { channelId: id },
    fetchPolicy: "network-only",
    errorPolicy: "all",
  });

  console.log("errrorororor", error);
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

  if (loading || meLoading) return <Loading />;

  return <RegularMessagesWrapper data={data?.messages} me={meData?.me} />;
};

export default Messages;
