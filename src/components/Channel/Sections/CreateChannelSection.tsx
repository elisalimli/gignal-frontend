import React, { useState } from "react";
import CreateChannelModal from "../Modals/CreateChannelModal";
import PlusIcon from "../../icons/PlusIcon";
import MyIcon from "../../utils/MyIcon";
import Loading from "../../utils/Loading";
import { useGetTeamMembersQuery } from "../../../generated/graphql";

interface Props {
  teamId: number;
}

const CreateChannelSection: React.FC<Props> = ({ teamId }) => {
  const [open, setOpen] = useState(false);
  const { data, loading } = useGetTeamMembersQuery({
    variables: { teamId },
    skip: !open,
  });

  if (loading) return null;

  const handleClick = () => setOpen(!open);
  return (
    <div className="mr-1">
      <MyIcon className="team-icon" onClick={handleClick}>
        <PlusIcon />
      </MyIcon>
      <CreateChannelModal
        data={data?.getTeamMembers || []}
        teamId={teamId}
        key="direct-messages-modal"
        open={open}
        onClick={handleClick}
      />
    </div>
  );
};

export default CreateChannelSection;
