import React from "react";
import { useAllTeamsQuery } from "../../generated/graphql";
import HomeIcon from "../icons/HomeIcon";
import PlusIcon from "../icons/PlusIcon";
import Team from "../Team/Team";
import MyIcon from "../utils/MyIcon";
import MyLink from "../utils/MyLink";

const Teams = () => {
  const { data, loading } = useAllTeamsQuery();
  if (loading) return null;

  return (
    <div className="teams py-2 text-white flex flex-col justify-between items-center">
      <div className="overflow-y-auto w-full">
        <ul className="flex flex-col items-center space-y-2">
          <MyLink href="/">
            <li className="single_team team_list">
              <HomeIcon />
            </li>
          </MyLink>{" "}
          {[...data.teams, ...data.invitedTeams].map((t) => (
            <Team team={t} key={`team-${t.id}`} />
          ))}
        </ul>
      </div>

      <div className="mt-2">
        <MyLink href="/create-team">
          <MyIcon
            w={14}
            aria-label="Create Channel"
            background="transparent"
            colorScheme="pink"
          >
            <PlusIcon />
          </MyIcon>
        </MyLink>
      </div>
    </div>
  );
};

export default Teams;
