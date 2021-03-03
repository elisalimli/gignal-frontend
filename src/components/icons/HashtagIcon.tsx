import React from "react";
import { HashtagIconWrapper } from "../styled/HashtagIconWrapper";

interface Props {}

const HashtagIcon: React.FC<Props> = () => {
  return (
    <HashtagIconWrapper
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
    </HashtagIconWrapper>
  );
};

export default HashtagIcon;
