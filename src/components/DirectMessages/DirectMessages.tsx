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
import {
  useDirectMessagesQuery,
  DirectMessageSnippetFragment,
} from "../../generated/graphql";
import { useGetTeamIdFromUrl } from "../../../hooks/useGetTeamIdFromUrl";
import { useRouter } from "next/router";
import DirectMessage from "./DirectMessage";

interface Props {}
const DirectMessages: React.FC<Props> = () => {
  const router = useRouter();
  console.log(router.query);
  const parsedOtherUserId = useGetTeamIdFromUrl(router.query.userId);
  const parsedTeamId = useGetTeamIdFromUrl(router.query.teamId);
  const { data, loading, subscribeToMore } = useDirectMessagesQuery({
    variables: {
      input: { otherUserId: parsedOtherUserId, teamId: parsedTeamId },
    },
    fetchPolicy: "network-only",
  });
  const { data: meData, loading: meLoading } = useMeQuery();
  console.log("data here", data);
  //   useNewMessageAddedSubscription({
  //     variables: { channelId: id },
  //   });
  //   useEffect(() => {
  //     const unsub = useSubscribeToMessages(subscribeToMore, id);
  //     return () => {
  //       unsub();
  //     };
  //   }, [id]);
  //   useEffect(() => useScrollToBottom(chatContainer), [data]);

  //   const chatContainer = useRef(null);

  if (loading || meLoading) return <Loading />;

  return (
    <div className="messages p-6">
      {data?.directMessages.map((m: DirectMessageSnippetFragment) => (
        <DirectMessage
          isCreator={m.sender.id === meData?.me?.id}
          key={`${m.id}-message`}
          message={m}
        />
      ))}
    </div>
  );
};

export default DirectMessages;
