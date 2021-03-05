import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useAllTeamsQuery } from "../src/generated/graphql";
import { withApollo } from "../src/utils/withApollo";
import ProtectedRoute from "../src/components/utils/ProtectedRoute";
import Loading from "../src/components/utils/Loading";
import { IndexWrapper } from "../src/components/styled/IndexPage/IndexWrapper";
import { IndexTeamsWrapper } from "../src/components/styled/IndexPage/IndexTeamsWrapper";
import { TeamsGrid } from "../src/components/styled/IndexPage/TeamsGrid";
import { TeamContainer } from "../src/components/styled/IndexPage/TeamContainer";
import { TeamLogo } from "../src/components/styled/IndexPage/TeamLogo";
import { TeamListItem } from "../src/components/styled/Team/TeamListItem";
import { IndexTeamName } from "../src/components/styled/IndexPage/IndexTeamName";
import { NoTeamWrapper } from "../src/components/styled/Team/NoTeamWrapper";

const Home = () => {
  const { data, loading } = useAllTeamsQuery();

  if (loading) return <Loading />;

  return (
    <ProtectedRoute>
      <IndexWrapper>
        {data?.teams?.length > 0 || data?.invitedTeams?.length > 0 ? (
          <IndexTeamsWrapper>
            <TeamsGrid>
              {[...data.teams, ...data.invitedTeams].map((team) => (
                <NextLink
                  key={`team-view-${team.id}`}
                  href={`/team/${team.id}`}
                  passHref
                >
                  <TeamContainer>
                    <TeamListItem w={65}>
                      {team.name.charAt(0).toUpperCase()}
                    </TeamListItem>
                    <IndexTeamName>{team.name}</IndexTeamName>
                  </TeamContainer>
                </NextLink>
              ))}
            </TeamsGrid>
          </IndexTeamsWrapper>
        ) : (
          <NoTeamWrapper>
            No team have been created,
            <NextLink passHref href="/create-team">
              <Link color="teal.500">click here for create new team</Link>
            </NextLink>
          </NoTeamWrapper>
        )}
      </IndexWrapper>
      {/* <Layout channelName="general" currentTeamId={10} /> */}
    </ProtectedRoute>
  );
};

export default withApollo({ ssr: true })(Home);
