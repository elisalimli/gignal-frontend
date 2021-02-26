import React from "react";

interface Props {
  w?: number;
  h?: number;
}

const HashtagIcon: React.FC<Props> = ({ w = 5, h = 5 }) => {
  return (
    <svg
      className={`w-${w} h-${h} inline font-semibold`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
      />
    </svg>
  );
};

export default HashtagIcon;
