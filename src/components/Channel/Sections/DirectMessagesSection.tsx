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
    <div style={{ marginRight: "0.25rem" }}>
      <MyIcon onClick={handleClick}>
        <PlusIcon />
      </MyIcon>
      <DirectMessageModal
        teamId={teamId}
        data={data?.getTeamMembers || []}
        key="direct-messages-modal"
        open={open}
        onClick={handleClick}
      />
    </div>
  );
};

export default DirectMessagesSection;
