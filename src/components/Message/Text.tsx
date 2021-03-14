import React from "react";
import Linkify from "../Linkify";

interface Props {
  text: string | null;
}

const Text: React.FC<Props> = ({ text }) => {
  return <Linkify>{text}</Linkify>;
};

export default Text;
