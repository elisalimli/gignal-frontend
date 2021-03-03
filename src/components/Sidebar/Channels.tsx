import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { useTeamQuery } from "../../generated/graphql";
import Channel from "../Channel/Channel";
import Member from "../Channel/Member";
import CreateChannelSection from "../Channel/Sections/CreateChannelSection";
import InvitePeopleSection from "../Channel/Sections/InvitePeopleSection";
import { ChannelHeader } from "../styled/Channel/ChannelHeader";
import { ChannelsList } from "../styled/Channel/ChannelsList";
import { ChannelsListWrapper } from "../styled/Channel/ChannelsWrapper";
import { ChannelWrapper } from "../styled/Channel/ChannelWrapper";
import { ChannelActionWrapper } from "../styled/Channel/ChannelActionWrapper";
import { TeamNameHeader } from "../styled/Team/TeamNameHeader";
import { UserName } from "../styled/User/UserName";
import { ChannelList } from "../styled/Channel/ChannelList";
import { useGetIdFromUrl } from "../../utils/hooks/useGetIdFromUrl";
import DirectMessagesSection from "../Channel/Sections/DirectMessagesSection";

interface Props {}

const paddingLeft = "padding-left: 10px";

const PushLeft = styled.div`
  ${paddingLeft};
`;

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
    <ChannelWrapper>
      <PushLeft>
        <ChannelHeader>
          <TeamNameHeader>{name}</TeamNameHeader>
          <UserName>{username}</UserName>
        </ChannelHeader>
      </PushLeft>

      <ChannelsListWrapper>
        <ChannelsList>
          <ChannelActionWrapper>
            <PushLeft>Channels</PushLeft>
            {admin ? <CreateChannelSection /> : null}
          </ChannelActionWrapper>
          {channels.map((channel) => (
            <Channel key={`channel-${channel.id}`} channel={channel} />
          ))}
        </ChannelsList>
      </ChannelsListWrapper>
      <div>
        <ul>
          <ChannelActionWrapper>
            <PushLeft>Direct Messages</PushLeft>
            {admin ? <DirectMessagesSection teamId={data?.team?.id} /> : null}
          </ChannelActionWrapper>

          {members.length ? (
            members.map((m) => (
              <Member
                key={`team-member-${m.id}`}
                member={m}
                teamId={data?.team.id}
              />
            ))
          ) : (
            <ChannelList>No member found</ChannelList>
          )}

          {admin ? (
            <ChannelList>
              <PushLeft>
                <InvitePeopleSection />
              </PushLeft>
            </ChannelList>
          ) : null}
        </ul>
      </div>
    </ChannelWrapper>
  );
};

export default Channels;
