import React from "react";
import { RegularTeamsSnippetFragment } from "../../generated/graphql";
import MyLink from "../utils/MyLink";
import { TeamListItem } from "../styled/Team/TeamListItem";

interface Props {
  team: RegularTeamsSnippetFragment;
}

const Team: React.FC<Props> = ({ team: { id, name } }) => {
  return (
    <MyLink href="/team/[teamId]" as={`/team/${id}`}>
      <TeamListItem w={45}>{name.charAt(0).toUpperCase()}</TeamListItem>
    </MyLink>
  );
};

export default Team;
