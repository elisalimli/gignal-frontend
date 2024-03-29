import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Header from "../../../../src/components/Sidebar/Header";
import Messages from "../../../../src/components/Sidebar/Messages";
import SendMessage from "../../../../src/components/Sidebar/SendMessage";
import Loading from "../../../../src/components/utils/Loading";
import MyLink from "../../../../src/components/utils/MyLink";
import ProtectedRoute from "../../../../src/components/utils/ProtectedRoute";
import Sidebar from "../../../../src/containers/Sidebar";
import {
  useChannelQuery,
  useCreateMessageMutation,
  useTeamQuery,
} from "../../../../src/generated/graphql";
import { useGetIdFromUrl } from "../../../../src/utils/hooks/useGetIdFromUrl";
import { withApollo } from "../../../../src/utils/withApollo";

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
        input: {
          channelId: channelData?.channel.id,
          text: message,
          file: null,
        },
      },
    });
  };

  return (
    <ProtectedRoute>
      {data?.team && channelData ? (
        <div className="app_layout">
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
        </div>
      ) : (
        <div className="p-5 text-2xl font-bold text-center">
          Cannot find team
          <MyLink href="/">
            <span className="ml-1">go home</span>
          </MyLink>
        </div>
      )}
    </ProtectedRoute>
  );
};

export default withApollo({ ssr: true })(Main);
