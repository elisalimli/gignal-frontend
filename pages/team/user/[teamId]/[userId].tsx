import { useRouter } from "next/router";
import React from "react";
import DirectMessages from "../../../../src/components/DirectMessages/DirectMessages";
import Header from "../../../../src/components/Sidebar/Header";
import SendMessage from "../../../../src/components/Sidebar/SendMessage";
import ProtectedRoute from "../../../../src/components/utils/ProtectedRoute";
import Sidebar from "../../../../src/containers/Sidebar";
import { withApollo } from "../../../../src/utils/withApollo";
import { useCreateDirectMessageMutation } from "../../../../src/generated/graphql";
import { useGetIdFromUrl } from "../../../../src/utils/hooks/useGetIdFromUrl";

interface Props {}

const Main = (props: Props) => {
  const [createDirectMessage] = useCreateDirectMessageMutation();

  const router = useRouter();
  const handleOnSubmitDirectMessage = async (text) => {
    const query = router.query;
    await createDirectMessage({
      variables: {
        input: {
          text,
          receiverId: useGetIdFromUrl(query.userId),
          teamId: useGetIdFromUrl(query.teamId),
        },
      },
    });
  };

  return (
    <ProtectedRoute>
      <div className="app-layout">
        <Sidebar />
        <Header name={"someone's name"} />
        <DirectMessages />
        <SendMessage
          placeholder="test bob"
          onSubmit={handleOnSubmitDirectMessage}
        />
      </div>
    </ProtectedRoute>
  );
};

export default withApollo({ ssr: true })(Main);
