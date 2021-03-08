import React from "react";
import ReactModal from "react-modal";
import ModalCloseButton from "./ModalCloseButton";
import ModalHeader from "./ModalHeader";

interface Props {
  open: boolean;
  onClick: () => void;
  extraStyle: Object;
  header: string;
}
const Modal: React.FC<Props> = ({
  open,
  onClick,
  extraStyle,
  header,
  children,
}) => {
  ReactModal.setAppElement("#myapp");

  return (
    <ReactModal
      style={{ content: extraStyle }}
      onRequestClose={onClick}
      isOpen={open}
    >
      <ModalHeader header={header} />
      <ModalCloseButton onClick={onClick} />
      <div>{children}</div>
    </ReactModal>
  );
};

export default Modal;
