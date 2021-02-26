import React, { useState } from "react";
import InvitePeopleModal from "../Modals/InvitePeopleModal";

interface Props {}

const InvitePeopleSection = (props: Props) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Invite people +
      </button>
      <InvitePeopleModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default InvitePeopleSection;
