import React from "react";

interface Props {}

const LightningIcon = (props: Props) => {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="white"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  );
};

export default LightningIcon;
