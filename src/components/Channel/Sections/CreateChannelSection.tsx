import React, { useState } from "react";
import CreateChannelModal from "../Modals/CreateChannelModal";
import PlusIcon from "../../icons/PlusIcon";
import MyIcon from "../../utils/MyIcon";

interface Props {}

const CreateChannelSection = (props: Props) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div>
      <MyIcon
        w={2}
        h={6}
        aria-label="Create Channel"
        background="transparent"
        colorScheme="pink"
        onClick={handleClick}
      >
        <PlusIcon />
      </MyIcon>
      <CreateChannelModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default CreateChannelSection;
