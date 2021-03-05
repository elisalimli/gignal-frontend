import { Link } from "@chakra-ui/react/";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Header from "../../../../src/components/Sidebar/Header";
import Messages from "../../../../src/components/Sidebar/Messages";
import SendMessage from "../../../../src/components/Sidebar/SendMessage";
import Loading from "../../../../src/components/utils/Loading";
import ProtectedRoute from "../../../../src/components/utils/ProtectedRoute";
import Sidebar from "../../../../src/containers/Sidebar";
import {
  useChannelQuery,
  useCreateMessageMutation,
  useTeamQuery,
} from "../../../../src/generated/graphql";
import { withApollo } from "../../../../src/utils/withApollo";
import { useGetIdFromUrl } from "../../../../src/utils/hooks/useGetIdFromUrl";
import { AppLayout } from "../../../../src/components/styled/AppLayout";

interface Props {}

const Main = () => {
  const router = useRouter();
  const parsedTeamId = useGetIdFromUrl(router.query.teamId);
  const parsedChannelId = useGetIdFromUrl(router.query.channelId);
  const { data, loading } = useTeamQuery({
    variables: {
      teamId: parsedTeamId,
    },
  });
  const [createMessage] = useCreateMessageMutation();

  const { data: channelData, loading: channelLoading } = useChannelQuery({
    variables: { input: { teamId: parsedTeamId, channelId: parsedChannelId } },
  });

  if (loading || channelLoading) return <Loading />;

  const onSubmitMessage = async (message) => {
    await createMessage({
      variables: {
        input: { channelId: channelData?.channel.id, text: message },
      },
    });
  };

  return (
    <ProtectedRoute>
      {data?.team && channelData ? (
        <AppLayout>
          <Head>
            <title>
              Gignal | {data.team.name} #{channelData.channel.name}
            </title>
          </Head>

          <Sidebar />
          <Header name={channelData?.channel?.name} />
          <Messages channel={channelData?.channel} />
          <SendMessage
            placeholder={channelData?.channel.name}
            onSubmit={onSubmitMessage}
          />
        </AppLayout>
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
