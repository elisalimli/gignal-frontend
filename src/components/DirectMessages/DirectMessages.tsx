/* eslint-disable eqeqeq */
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDirectMessagesQuery, useMeQuery } from "../../generated/graphql";
import RegularMessagesWrapper from "../Sidebar/RegularMessagesWrapper";
import Loading from "../utils/Loading";
import DirectMessageError from "./DirectMessageError";
import { useGetIdFromUrl } from "../../utils/hooks/useGetIdFromUrl";

interface Props {}
const DirectMessages: React.FC<Props> = () => {
  const router = useRouter();
  const parsedOtherUserId = useGetIdFromUrl(router.query.userId);
  const parsedTeamId = useGetIdFromUrl(router.query.teamId);
  const { data, loading, subscribeToMore } = useDirectMessagesQuery({
    variables: {
      input: { otherUserId: parsedOtherUserId, teamId: parsedTeamId },
    },
    fetchPolicy: "network-only",
  });
  const { data: meData, loading: meLoading } = useMeQuery();

  const isYou = parsedOtherUserId == meData?.me.id;

  useEffect(() => {
    if (isYou) router.push(`/team/${parsedTeamId}`);
  }, [isYou, router]);
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

  if (!parsedOtherUserId || !parsedTeamId) {
    router.replace("/");
    return null;
  }

  return isYou ? (
    <DirectMessageError />
  ) : (
    <RegularMessagesWrapper data={data?.directMessages} me={meData?.me} />
  );
};

export default DirectMessages;
