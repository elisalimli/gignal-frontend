import React, { useState } from "react";
import TestModal from "../Modals/TestModal";

interface Props {}

const TestSection = (props: Props) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(!open);

  return (
    <div>
      <button className="modalButton" type="button" onClick={handleClick}>
        Invite people +
      </button>
      <TestModal
        key="invite-people-modal"
        open={open}
        header="Test Header"
        onClick={handleClick}
      />
    </div>
  );
};

export default TestSection;
