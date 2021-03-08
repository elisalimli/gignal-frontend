import React from "react";
import CloseIcon from "../icons/CloseIcon";
import MyIcon from "../utils/MyIcon";

interface Props {
  onClick: () => void;
}

const ModalCloseButton = ({ onClick }: Props) => {
  return (
    <div style={{ top: 10, right: 10 }} className="absolute">
      <MyIcon onClick={onClick} className="text-xl icon-bg-white">
        <CloseIcon />
      </MyIcon>
    </div>
  );
};

export default ModalCloseButton;
