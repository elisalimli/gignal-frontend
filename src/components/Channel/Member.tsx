import { Text } from "@chakra-ui/react";
import React from "react";
import { MemberSnippetFragment } from "../../generated/graphql";
import Bubble from "./Bubble";

interface Props {
  member: MemberSnippetFragment;
}

const Member = ({
  member: {
    user: { username },
    admin,
    isYou,
  },
}: Props) => {
  return (
    <li className="channel_list pl-1 cursor-pointer">
      <span className="ml-1 flex items-center">
        <Bubble on />
        {username}
        {isYou ? (
          <Text display="inline" ml={1} fontSize="xs">
            you
          </Text>
        ) : null}
      </span>
    </li>
  );
};

export default Member;
