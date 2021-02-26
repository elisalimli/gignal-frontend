import { Link } from "@chakra-ui/react/";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useGetTeamIdFromUrl } from "../../../../hooks/useGetTeamIdFromUrl";
import Header from "../../../../src/components/Sidebar/Header";
import Messages from "../../../../src/components/Sidebar/Messages";
import SendMessage from "../../../../src/components/Sidebar/SendMessage";
import Loading from "../../../../src/components/utils/Loading";
import ProtectedRoute from "../../../../src/components/utils/ProtectedRoute";
import Sidebar from "../../../../src/containers/Sidebar";
import {
  useChannelQuery,
  useMeQuery,
  useTeamQuery,
} from "../../../../src/generated/graphql";
import { withApollo } from "../../../../src/utils/withApollo";

interface Props {}

const Main = (props: Props) => {
  const router = useRouter();
  const parsedTeamId = useGetTeamIdFromUrl(router.query.teamId);
  const parsedChannelId = useGetTeamIdFromUrl(router.query.channelId);
  const { data, loading } = useTeamQuery({
    variables: {
      teamId: parsedTeamId,
    },
  });

  const { data: channelData, loading: channelLoading } = useChannelQuery({
    variables: { input: { teamId: parsedTeamId, channelId: parsedChannelId } },
  });

  if (loading || channelLoading) return <Loading />;

  return (
    <ProtectedRoute>
      {data?.team && channelData ? (
        <div className="app-layout">
          <Sidebar />
          <Header channel={channelData?.channel} />
          <Messages channel={channelData?.channel} />
          <SendMessage channel={channelData?.channel} />
        </div>
      ) : (
        <div className="p-5  text-2xl font-bold text-center">
          Cannot find team
          <NextLink href="/">
            <Link ml={1}>go home</Link>
          </NextLink>
        </div>
      )}
    </ProtectedRoute>
  );
};

export default withApollo({ ssr: true })(Main);
