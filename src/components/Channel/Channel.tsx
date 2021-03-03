import React from "react";
import { ChannelsSnippetFragment } from "../../generated/graphql";
import MyLink from "../utils/MyLink";
import { ChannelList } from "../styled/Channel/ChannelList";

interface Props {
  channel: ChannelsSnippetFragment;
}

const Channel: React.FC<Props> = ({ channel: { id, name, teamId } }) => {
  return (
    <MyLink
      href="/team/view/[teamId]/[channelId]"
      as={`/team/view/${teamId}/${id}`}
    >
      <ChannelList>
        <span style={{ marginLeft: "0.25rem" }}># {name}</span>
      </ChannelList>
    </MyLink>
  );
};

export default Channel;
