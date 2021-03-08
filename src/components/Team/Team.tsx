import React from "react";
import { RegularTeamsSnippetFragment } from "../../generated/graphql";
import MyLink from "../utils/MyLink";

interface Props {
  team: RegularTeamsSnippetFragment;
}

export const teamListStyle =
  "bg-gray-750 w-12  h-12 text-white mx-auto mb-2 flex justify-center items-center text-2xl rounded-xl team_list   hover:border-team-border";

const Team: React.FC<Props> = ({ team: { id, name } }) => {
  return (
    <MyLink href="/team/[teamId]" as={`/team/${id}`}>
      <div className={teamListStyle}>{name.charAt(0).toUpperCase()}</div>
    </MyLink>
  );
};

export default Team;
