import React from "react";

interface Props {
  on?: Boolean;
}

const Bubble = ({ on = true }: Props) => {
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full mr-1 ${
        on ? "bg-green-500" : "bg-gray-500"
      }`}
    />
  );
};

export default Bubble;
