import React from "react";
import { RegularMemberUserSnippetFragment } from "../../generated/graphql";
import Bubble from "../utils/Bubble";
import MyLink from "../utils/MyLink";
import { channelListStyle } from "./Channel";

interface Props {
  member: RegularMemberUserSnippetFragment;
  teamId: number;
}

const Member = ({ member: { username, id }, teamId }: Props) => {
  return (
    <MyLink href={`/team/user/${teamId}/${id}`}>
      <li className={channelListStyle}>
        <div className="flex items-center ml-1">
          <Bubble on />
          {username}
        </div>
      </li>
    </MyLink>
  );
};

export default Member;
