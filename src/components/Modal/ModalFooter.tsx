import React from "react";
import Button from "../Button";

interface Props {
  mt?: number;
}

const ModalFooter: React.FC<Props> = ({ children, mt = 8 }) => {
  return <footer className={`flex justify-end mt-${mt}`}>{children}</footer>;
};

export default ModalFooter;
