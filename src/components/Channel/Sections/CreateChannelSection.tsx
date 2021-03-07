import React, { useState } from "react";
import CreateChannelModal from "../Modals/CreateChannelModal";
import PlusIcon from "../../icons/PlusIcon";
import MyIcon from "../../utils/MyIcon";

interface Props {}

const CreateChannelSection = (props: Props) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(!open);
  return (
    <div className="mr-1">
      <MyIcon onClick={handleClick}>
        <PlusIcon />
      </MyIcon>
      <CreateChannelModal
        key="direct-messages-modal"
        open={open}
        onClick={handleClick}
      />
    </div>
  );
};

export default CreateChannelSection;
