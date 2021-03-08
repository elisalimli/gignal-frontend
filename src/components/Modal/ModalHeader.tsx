import React from "react";
import Header from "../Header";

interface Props {
  header: string;
}

const ModalHeader: React.FC<Props> = ({ header }) => {
  return (
    <Header extraClassName="mb-2 justify-start" fontWeight="bold" size="2xl">
      {header}
    </Header>
  );
};

export default ModalHeader;
