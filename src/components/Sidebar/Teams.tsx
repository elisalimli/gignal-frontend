import React from "react";
import { TeamsList } from "../styled/Team/TeamsList";
import { TeamListItem } from "../styled/Team/TeamListItem";
import { useAllTeamsQuery } from "../../generated/graphql";
import HomeIcon from "../icons/HomeIcon";
import PlusIcon from "../icons/PlusIcon";
import Team from "../Team/Team";
import MyIcon from "../utils/MyIcon";
import MyLink from "../utils/MyLink";
import { TeamsWrapper } from "../styled/Team/TeamsWrapper";

const Teams = () => {
  const { data, loading } = useAllTeamsQuery();
  if (loading) return null;

  return (
    <TeamsWrapper>
      <TeamsList>
        <TeamListItem w={45}>
          <MyLink href="/">
            <HomeIcon />
          </MyLink>
        </TeamListItem>
        {[...data.teams, ...data.invitedTeams].map((t) => (
          <Team team={t} key={`team-${t.id}`} />
        ))}
      </TeamsList>

      <div style={{ margin: "7.5px auto 0px auto" }}>
        <MyLink href="/create-team">
          <span>
            <MyIcon w="3rem" h="2rem">
              <PlusIcon />
            </MyIcon>
          </span>
        </MyLink>
      </div>
    </TeamsWrapper>
  );
};

export default Teams;
