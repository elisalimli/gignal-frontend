import React from "react";
import { useAllTeamsQuery } from "../../generated/graphql";
import HomeIcon from "../icons/HomeIcon";
import PlusIcon from "../icons/PlusIcon";
import Team, { teamListStyle } from "../Team/Team";
import MyIcon from "../utils/MyIcon";
import MyLink from "../utils/MyLink";

const Teams = () => {
  const { data, loading } = useAllTeamsQuery();
  if (loading) return null;

  const teamsBody = [...data.teams, ...data.invitedTeams].map((t) => (
    <Team team={t} key={`team-${t.id}`} />
  ));

  return (
    <div className="teams bg-team-bg  text-white flex flex-col justify-between overflow-y-auto w-full">
      <ul className="flex flex-col list-none overflow-y-auto">
        <MyLink href="/">
          <div className={teamListStyle}>
            <HomeIcon />
          </div>
        </MyLink>
        {teamsBody}
      </ul>

      <div className="mx-auto mt-1">
        <MyLink href="/create-team">
          <span>
            <MyIcon className="team-icon w-12">
              <PlusIcon />
            </MyIcon>
          </span>
        </MyLink>
      </div>
    </div>
  );
};

export default Teams;
