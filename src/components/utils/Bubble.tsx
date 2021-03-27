import React from "react";

interface Props {
  on: boolean;
}

const Bubble: React.FC<Props> = ({ on }) => {
  const background = on ? "bg-green-500" : "bg-red-500";
  return <span className={`w-2 h-2 mr-1 rounded-full ${background}`} />;
};

export default Bubble;
