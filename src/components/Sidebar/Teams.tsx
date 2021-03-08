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

  return (
    <div className="teams bg-custom-team  text-white flex flex-col justify-between overflow-y-auto w-full">
      <ul className="flex flex-col list-none overflow-y-auto">
        <div className={teamListStyle}>
          <MyLink href="/">
            <HomeIcon />
          </MyLink>
        </div>
        {[...data.teams, ...data.invitedTeams].map((t) => (
          <Team team={t} key={`team-${t.id}`} />
        ))}
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
