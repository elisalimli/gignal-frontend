import { Link } from "@chakra-ui/react/";
import Head from "next/head";
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
  useTeamQuery,
} from "../../../../src/generated/graphql";
import { withApollo } from "../../../../src/utils/withApollo";
import DirectMessages from "../../../../src/components/DirectMessages/DirectMessages";

interface Props {}

const Main = (props: Props) => {
  const router = useRouter();

  //   if (loading || channelLoading) return <Loading />;

  return (
    <ProtectedRoute>
      <div className="app-layout">
        <Sidebar />
        <Header name={"someone's name"} />
        <DirectMessages />
        <SendMessage placeholder="test bob" onSubmit={() => {}} />
      </div>
    </ProtectedRoute>
  );
};

export default withApollo({ ssr: true })(Main);
