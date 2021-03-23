import React, { useEffect, useState } from "react";
import {
  ChannelsSnippetFragment,
  useMeQuery,
  useMessagesQuery,
  useNewMessageAddedSubscription,
} from "../../generated/graphql";
import { useSubscribeToMessages } from "../../utils/hooks/useSubscribeToMessages";
import Loading from "../utils/Loading";
import RegularMessagesWrapper from "./RegularMessagesWrapper";
import Button from "../Button";

interface Props {
  channel: ChannelsSnippetFragment;
}
const Messages: React.FC<Props> = ({ channel: { id } }) => {
  const [limit, setLimit] = useState(10);
  const {
    data,
    loading,
    subscribeToMore,
    fetchMore,
    variables,
  } = useMessagesQuery({
    variables: {
      input: { channelId: id, limit: 20, cursor: null },
    },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
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

  if ((loading || meLoading) && !data?.messages) return <Loading />;

  return (
    <RegularMessagesWrapper
      hasMore={data?.messages?.hasMore}
      fetchMore={fetchMore}
      loading={loading}
      variables={variables}
      data={data?.messages?.messages || []}
      channelId={id}
      me={meData?.me}
    />
  );
};

export default Messages;
