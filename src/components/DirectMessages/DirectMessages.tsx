/* eslint-disable eqeqeq */
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {
  useDirectMessagesQuery,
  useMeQuery,
  useNewDirectMessageAddedSubscription,
} from "../../generated/graphql";
import { useGetIdFromUrl } from "../../utils/hooks/useGetIdFromUrl";
import { useSubscribeTodDirectMessages } from "../../utils/hooks/useSubscribeToDirectMessages";
import RegularMessagesWrapper from "../Sidebar/RegularMessagesWrapper";
import Loading from "../utils/Loading";

interface Props {
  receiverId: number;
}

const DirectMessages: React.FC<Props> = ({ receiverId }) => {
  const router = useRouter();
  const parsedTeamId = useGetIdFromUrl(router.query.teamId);

  const input = { receiverId, teamId: parsedTeamId };

  const { data, loading, subscribeToMore } = useDirectMessagesQuery({
    variables: {
      input: { otherUserId: receiverId, teamId: parsedTeamId },
    },
    fetchPolicy: "network-only",
  });
  const { data: meData, loading: meLoading } = useMeQuery();

  const isYou = receiverId == meData?.me.id;

  useEffect(() => {
    if (isYou) router.push(`/team/${parsedTeamId}`);
  }, [isYou, router]);

  useNewDirectMessageAddedSubscription({
    variables: {
      input,
    },
  });
  useEffect(() => {
    const unsub = useSubscribeTodDirectMessages(subscribeToMore, input);
    return () => {
      unsub();
    };
  }, [receiverId, parsedTeamId]);

  if (loading || meLoading) return <Loading />;

  if (!receiverId || !parsedTeamId) {
    router.replace("/");
    return null;
  }

  return <RegularMessagesWrapper data={data?.directMessages} me={meData?.me} />;
};

export default DirectMessages;
