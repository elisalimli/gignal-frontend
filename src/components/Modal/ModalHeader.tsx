import React from "react";

interface Props {
  header: string;
}

const ModalHeader: React.FC<Props> = ({ header }) => {
  return <div className="bg-red-500">{header}</div>;
};

export default ModalHeader;
