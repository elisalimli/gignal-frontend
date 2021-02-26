import { useRouter } from "next/router";
import React from "react";
import { useGetTeamIdFromUrl } from "../../hooks/useGetTeamIdFromUrl";
import Loading from "../../src/components/utils/Loading";
import { useTeamQuery } from "../../src/generated/graphql";
import { withApollo } from "../../src/utils/withApollo";

const SingleTeam = () => {
  const router = useRouter();
  const { data, loading } = useTeamQuery({
    variables: { teamId: useGetTeamIdFromUrl(router.query.id) },
  });
  if (loading) return <Loading />;
  if (!data && !loading) {
    router.replace("/");
  }

  console.log("data", data, loading);
  if (data) {
    router.push(`/team/view/${data?.team?.id}/${data?.team?.channels[0].id}`);
  }
  return null;
};

export default withApollo({ ssr: false })(SingleTeam);
