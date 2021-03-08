import { useRouter } from "next/router";
import React from "react";
import { useTeamQuery } from "../../generated/graphql";
import { useGetIdFromUrl } from "../../utils/hooks/useGetIdFromUrl";
import Channel, { channelListStyle } from "../Channel/Channel";
import Member from "../Channel/Member";
import CreateChannelSection from "../Channel/Sections/CreateChannelSection";
import DirectMessagesSection from "../Channel/Sections/DirectMessagesSection";
import InvitePeopleSection from "../Channel/Sections/InvitePeopleSection";

interface Props {}

const paddingLeft = "pl-2";

const Channels: React.FC<Props> = () => {
  const router = useRouter();
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
  return (
    <div className="bg-channel-bg text-channel-color overflow-y-auto channels">
      <div className={`${paddingLeft} mb-1`}>
        <h2 className="font-bold text-xl text-white">{name}</h2>
        <span className="mb-2">{username}</span>
      </div>

      <ul className="mb-1 w-full">
        <div className="flex justify-between items-center">
          <div className={paddingLeft}>Channels</div>
          {admin ? <CreateChannelSection /> : null}
        </div>
        {channels.map((channel) => (
          <Channel key={`channel-${channel.id}`} channel={channel} />
        ))}
      </ul>
      <div>
        <ul>
          {/* CHANNEL ACTION WRAPPER REAPIR */}
          <div className="flex justify-between">
            <span className={paddingLeft}>Direct Messages</span>
            {admin ? <DirectMessagesSection teamId={data?.team?.id} /> : null}
          </div>

          {members.length ? (
            members.map((m) => (
              <Member
                key={`team-member-${m.id}`}
                member={m}
                teamId={data?.team.id}
              />
            ))
          ) : (
            <li className={channelListStyle}>No member found</li>
          )}

          {admin ? (
            <li className={`${channelListStyle} ${paddingLeft}`}>
              <>
                <InvitePeopleSection />
              </>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default Channels;
