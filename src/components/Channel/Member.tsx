import React from "react";
import { MemberSnippetFragment } from "../../generated/graphql";
import Bubble from "./Bubble";

interface Props {
  member: MemberSnippetFragment;
}

const Member = ({ member: { username } }: Props) => {
  return (
    <li className="channel_list pl-1 cursor-pointer">
      <span className="ml-1">
        <Bubble on />
        {username}
      </span>
    </li>
  );
};

export default Member;
