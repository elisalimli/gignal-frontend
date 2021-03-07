import React from "react";
import CloseIcon from "../icons/CloseIcon";
import MyIcon from "../utils/MyIcon";

interface Props {}

const ModalCloseButton = (props: Props) => {
  return (
    <div style={{ top: 10, right: 10 }} className="absolute">
      <MyIcon className="text-xl">
        <CloseIcon />
      </MyIcon>
    </div>
  );
};

export default ModalCloseButton;
