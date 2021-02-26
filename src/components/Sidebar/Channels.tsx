import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useGetTeamIdFromUrl } from "../../../hooks/useGetTeamIdFromUrl";
import { useMeQuery, useTeamQuery } from "../../generated/graphql";
import Channel from "../Channel/Channel";
import CreateChannelSection from "../Channel/Sections/CreateChannelSection";
import InvitePeopleSection from "../Channel/Sections/InvitePeopleSection";
import Member from "../Channel/Member";

interface Props {}

const Channels: React.FC<Props> = () => {
  const router = useRouter();
  const { data, loading } = useTeamQuery({
    variables: {
      teamId: useGetTeamIdFromUrl(router.query.teamId),
    },
  });

  if (loading || !data?.me || !data?.team) return null;

  const {
    team: { channels, id, name, members, admin },
    me: { username },
  } = data;

  const padding = "py-1 px-2";
  return (
    <div className="channels text-sm text-gray-300">
      <div className={`flex flex-col mb-2 ${padding}`}>
        <span className="text-white text-lg font-bold">{name}</span>
        <span className="text-xs">{username}</span>
      </div>

      <div className="mb-1">
        <ul className="w-full px-0">
          <li className="mx-2 flex flex-row justify-between items-center">
            Channels
            {admin ? <CreateChannelSection /> : null}
          </li>
          {channels.map((channel) => (
            <Channel key={`channel-${channel.id}`} channel={channel} />
          ))}
        </ul>
      </div>
      <div>
        <ul>
          <li className={padding}>Direct Messages</li>
          {members.length ? (
            members.map((m) => (
              <Member key={`team-member-${m.id}`} member={m} />
            ))
          ) : (
            <div className="channel_list pl-1">No member found</div>
          )}

          {admin ? (
            <li className={`${padding} cursor-pointer channel_list`}>
              <InvitePeopleSection />
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default Channels;
