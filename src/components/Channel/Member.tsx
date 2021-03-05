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

interface Props {
  member: RegularMemberUserSnippetFragment & { isYou: boolean };
  teamId: number;
}

const Member = ({ member: { username, id }, teamId }: Props) => {
  return (
    <MyLink href={`/team/user/${teamId}/${id}`}>
      <ChannelList>
        <MemberWrapper>
          <StyledBubble on="online" />
          {username}
        </MemberWrapper>
      </ChannelList>
    </MyLink>
  );
};

export default Member;
