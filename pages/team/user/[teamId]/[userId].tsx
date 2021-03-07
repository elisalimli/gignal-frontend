import { useRouter } from "next/router";
import React from "react";
import DirectMessages from "../../../../src/components/DirectMessages/DirectMessages";
import Header from "../../../../src/components/Sidebar/Header";
import SendMessage from "../../../../src/components/Sidebar/SendMessage";
import Loading from "../../../../src/components/utils/Loading";
import ProtectedRoute from "../../../../src/components/utils/ProtectedRoute";
import Sidebar from "../../../../src/containers/Sidebar";
import {
  useCreateDirectMessageMutation,
  useGetMemberQuery,
} from "../../../../src/generated/graphql";
import { useGetIdFromUrl } from "../../../../src/utils/hooks/useGetIdFromUrl";
import { updateCacheAfterDirectMessage } from "../../../../src/utils/updateCacheAfterDirectMessage";
import { withApollo } from "../../../../src/utils/withApollo";

interface Props {}

const Main: React.FC<Props> = () => {
  const router = useRouter();
  const receiverId = useGetIdFromUrl(router.query.userId);

  const [createDirectMessage] = useCreateDirectMessageMutation();
  const { data, loading } = useGetMemberQuery({
    variables: {
      userId: receiverId,
    },
  });
  const handleOnSubmitDirectMessage = async (text) => {
    const routerQuery = router.query;
    const teamId = useGetIdFromUrl(routerQuery.teamId);
    await createDirectMessage({
      variables: {
        input: {
          text,
          receiverId,
          teamId,
        },
      },
      update: async (cache) => {
        updateCacheAfterDirectMessage(
          teamId,
          receiverId,
          cache,
          data?.getMember
        );
      },
    });
  };

  if (loading) return <Loading />;

  return (
    <ProtectedRoute>
      <div className="app_layout">
        <Sidebar />
        <Header name={data?.getMember?.username} />
        <DirectMessages receiverId={data?.getMember?.id} />
        <SendMessage
          placeholder={data?.getMember?.username}
          onSubmit={handleOnSubmitDirectMessage}
        />
      </div>
    </ProtectedRoute>
  );
};

export default withApollo({ ssr: true })(Main);
