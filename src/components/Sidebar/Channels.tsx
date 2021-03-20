import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useTeamQuery, ChannelsSnippetFragment } from "../../generated/graphql";
import { useGetIdFromUrl } from "../../utils/hooks/useGetIdFromUrl";
import Channel, { channelListStyle } from "../Channel/Channel";
import Member from "../Channel/Member";
import CreateChannelSection from "../Channel/Sections/CreateChannelSection";
import DirectMessagesSection from "../Channel/Sections/DirectMessagesSection";
import InvitePeopleSection from "../Channel/Sections/InvitePeopleSection";
import ChannelList from "../ChannelList";

interface Props {}

const paddingLeft = "pl-2";

const Channels: React.FC<Props> = () => {
  const router = useRouter();
  const [state, setState] = useState<{
    regularChannels: ChannelsSnippetFragment[];
    dmChannels: ChannelsSnippetFragment[];
  }>({ regularChannels: [], dmChannels: [] });
  const { data, loading } = useTeamQuery({
    variables: {
      teamId: useGetIdFromUrl(router.query.teamId),
    },
  });

  if (loading || !data?.me || !data?.team) return null;

  const {
    team: { channels, id, name, directMessagesMembers: members, admin },
    me: { username },
  } = data;

  useEffect(() => {
    const regular = [];
    const dm = [];
    channels.forEach((c) => {
      if (c.dm) dm.push(c);
      else regular.push(c);
    });
    setState({ dmChannels: dm, regularChannels: regular });
  }, [channels]);

  const regularChannelsBody = state.regularChannels.map((channel) => (
    <Channel key={`channel-${channel.id}`} channel={channel} />
  ));

  const membersBody = members.map((m) => (
    <Member key={`team-member-${m.id}`} member={m} teamId={data?.team.id} />
  ));

  const dmChannelsBody = state.dmChannels.map((dm) => (
    <Channel channel={dm} key={`dm-channel-${dm.id}`} />
  ));

  return (
    <div className="bg-channel-bg text-channel-color overflow-y-auto channels">
      <div className={`${paddingLeft} mb-1`}>
        <h2 className="font-bold text-xl text-white">{name}</h2>
        <span className="mb-2">{username}</span>
      </div>

      <ul className="mb-1 w-full">
        <div className="flex justify-between items-center">
          <div className={paddingLeft}>Channels</div>
          {admin ? <CreateChannelSection teamId={data?.team?.id} /> : null}
        </div>
        {regularChannelsBody}
      </ul>
      <div>
        <ul>
          <div className="flex justify-between items-center">
            <span className={paddingLeft}>Direct Messages</span>
            <DirectMessagesSection teamId={data?.team?.id} />
          </div>
          {dmChannelsBody}

          {members.length || state.dmChannels.length ? (
            membersBody
          ) : (
            <ChannelList extraClassName="pl-1">No member found</ChannelList>
          )}

          {admin ? (
            <li className={`${channelListStyle} ${paddingLeft}`}>
              <InvitePeopleSection />
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default Channels;
