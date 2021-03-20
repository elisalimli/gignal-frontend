import React, { useState } from "react";
import PlusIcon from "../../icons/PlusIcon";
import MyIcon from "../../utils/MyIcon";
import DirectMessageModal from "../Modals/DirectMessageModal";
import { useGetTeamMembersQuery } from "../../../generated/graphql";
import Loading from "../../utils/Loading";

interface Props {
  teamId: number;
}

const DirectMessagesSection: React.FC<Props> = ({ teamId }) => {
  const [open, setOpen] = useState(false);
  const { data, loading } = useGetTeamMembersQuery({
    variables: { teamId },
    skip: !open,
  });

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="mr-1">
      <MyIcon className="team-icon" onClick={handleClick}>
        <PlusIcon />
      </MyIcon>
      <DirectMessageModal
        teamId={teamId}
        data={data?.getTeamMembers || []}
        key="direct-messages-modal"
        open={open}
        onClose={handleClick}
      />
    </div>
  );
};

export default DirectMessagesSection;
