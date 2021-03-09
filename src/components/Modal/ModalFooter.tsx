import React from "react";
import Button from "../Button";

interface Props {}

const ModalFooter: React.FC<Props> = ({ children }) => {
  return <footer className="flex justify-end mt-8">{children}</footer>;
};

export default ModalFooter;
