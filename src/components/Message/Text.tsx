import React from "react";

interface Props {
  text: string | null;
}

const Text: React.FC<Props> = ({ text }) => {
  return <div>{text}</div>;
};

export default Text;
