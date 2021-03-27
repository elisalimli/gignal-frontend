import React from "react";
import { ChannelsSnippetFragment } from "../../generated/graphql";
import MyLink from "../utils/MyLink";

interface Props {
  channel: ChannelsSnippetFragment;
}

export const channelListStyle = "font-medium hover:bg-channel-list";

const Channel: React.FC<Props> = ({ channel: { id, name, teamId } }) => {
  return (
    <MyLink
      href="/team/view/[teamId]/[channelId]"
      as={`/team/view/${teamId}/${id}`}
    >
      <li className={channelListStyle}>
        <span style={{ marginLeft: "0.25rem" }}># {name}</span>
      </li>
    </MyLink>
  );
};

export default Channel;
