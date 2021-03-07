import { Text } from "@chakra-ui/react";
import React from "react";
import {
  MemberSnippetFragment,
  RegularMemberUserSnippetFragment,
} from "../../generated/graphql";
import { ChannelList } from "../styled/Channel/ChannelList";
import { StyledBubble } from "../styled/StyledBubble";
import { MemberWrapper } from "../styled/Channel/MemberWrapper";
import MyLink from "../utils/MyLink";
import { channelListStyle } from "./Channel";
import Bubble from "../utils/Bubble";

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
