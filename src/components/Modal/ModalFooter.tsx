import React from "react";

interface Props {
  mt?: string;
}

const ModalFooter: React.FC<Props> = ({ children, mt = "mt-8" }) => {
  return <footer className={`flex justify-end ${mt}`}>{children}</footer>;
};

export default ModalFooter;
