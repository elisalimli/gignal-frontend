import { useRouter } from "next/router";
import React from "react";
import Loading from "../../src/components/utils/Loading";
import { useTeamQuery } from "../../src/generated/graphql";
import { useGetIdFromUrl } from "../../src/utils/hooks/useGetIdFromUrl";
import { withApollo } from "../../src/utils/withApollo";

const SingleTeam = () => {
  const router = useRouter();
  const { data, loading } = useTeamQuery({
    variables: { teamId: useGetIdFromUrl(router.query.id) },
  });
  if (loading) return <Loading />;
  if (!data && !loading) {
    router.replace("/");
  }

  if (data) {
    router.push(`/team/view/${data?.team?.id}/${data?.team?.channels[0].id}`);
  }
  return null;
};

export default withApollo({ ssr: false })(SingleTeam);
