import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { teamListStyle } from "../src/components/Team/Team";
import Loading from "../src/components/utils/Loading";
import ProtectedRoute from "../src/components/utils/ProtectedRoute";
import { useAllTeamsQuery } from "../src/generated/graphql";
import { withApollo } from "../src/utils/withApollo";

const Home = () => {
  const { data, loading } = useAllTeamsQuery();

  if (loading) return <Loading />;

  return (
    <ProtectedRoute>
      <div className="bg-gray-200 min-h-screen">
        {data?.teams?.length > 0 || data?.invitedTeams?.length > 0 ? (
          <div className="flex  p-3 mx-auto max-w-2xl justify-center items-center ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-3 gap-4 w-full">
              {[...data.teams, ...data.invitedTeams].map((team) => (
                <NextLink
                  key={`team-view-${team.id}`}
                  href={`/team/${team.id}`}
                  passHref
                >
                  <a className="bg-white transition-all duration-1000 hover:bg-gray-300 shadow-lg rounded-md flex justify-center items-center flex-col cursor-pointer p-4 text-gray-900">
                    <div className={`${teamListStyle} w-16 h-16`}>
                      {team.name.charAt(0).toUpperCase()}
                    </div>
                    <h2 className="text-2xl font-semibold mb-1">{team.name}</h2>
                  </a>
                  {/* </a> */}
                </NextLink>
              ))}
            </div>
          </div>
        ) : (
          <div>
            No team have been created,
            <NextLink passHref href="/create-team">
              <Link color="teal.500">click here for create new team</Link>
            </NextLink>
          </div>
        )}
      </div>
      {/* <Layout channelName="general" currentTeamId={10} /> */}
    </ProtectedRoute>
  );
};

export default withApollo({ ssr: true })(Home);
