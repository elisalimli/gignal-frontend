import { useRouter } from "next/router";
import React from "react";
import { ChannelsSnippetFragment } from "../../generated/graphql";
import MyLink from "../utils/MyLink";

interface Props {
  channel: ChannelsSnippetFragment;
}

const Channel: React.FC<Props> = ({ channel: { id, name, teamId } }) => {
  const router = useRouter();

  return (
    <MyLink
      href="/team/view/[teamId]/[channelId]"
      as={`/team/view/${teamId}/${id}`}
    >
      <li className="channel_list cursor-pointer">
        <span className="ml-1"># {name}</span>
      </li>
    </MyLink>
  );
};

export default Channel;
