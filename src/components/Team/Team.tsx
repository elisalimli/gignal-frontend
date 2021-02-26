import React from "react";
import { RegularTeamsSnippetFragment } from "../../generated/graphql";
import MyLink from "../utils/MyLink";

interface Props {
  team: RegularTeamsSnippetFragment;
}

const Team: React.FC<Props> = ({ team: { id, name } }) => {
  return (
    <MyLink href="/team/[teamId]" as={`/team/${id}`}>
      <li className="single_team team_list">{name.charAt(0).toUpperCase()}</li>
    </MyLink>
  );
};

export default Team;
