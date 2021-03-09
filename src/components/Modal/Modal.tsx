import React from "react";
import ReactModal from "react-modal";
import ModalCloseButton from "./ModalCloseButton";
import ModalHeader from "./ModalHeader";

interface Props {
  open: boolean;
  onClick: () => void;
  extraStyle: Object;
  header: string;
  className?: string;
}

// You should add classname to modal
// if you don't want sizing problems (look below React Modal's classname)

const Modal: React.FC<Props> = ({
  open,
  onClick,
  extraStyle,
  header,
  children,
  className,
}) => {
  ReactModal.setAppElement("#myapp");

  return (
    <ReactModal
      style={{ content: extraStyle }}
      onRequestClose={onClick}
      isOpen={open}
      className={`${className} my-modal rounded-md shadow-2xl`}
    >
      <div className="p-4 bg-white  rounded-xl">
        <ModalHeader header={header} />
        <ModalCloseButton onClick={onClick} />
        <div>{children}</div>
      </div>
    </ReactModal>
  );
};

export default Modal;
