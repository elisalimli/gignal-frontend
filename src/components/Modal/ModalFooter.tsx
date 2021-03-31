import React from "react";

interface Props {
  mt?: number;
}

const ModalFooter: React.FC<Props> = ({ children, mt = 8 }) => {
  return <footer className={`flex justify-end mt-${mt}`}>{children}</footer>;
};

export default ModalFooter;
