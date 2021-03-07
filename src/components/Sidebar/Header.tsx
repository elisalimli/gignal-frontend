import React from "react";
import HashtagIcon from "../icons/HashtagIcon";
import { HeaderWrapper, HeaderName } from "../styled/HeaderWrapper";

interface Props {
  name: string;
}

const Header: React.FC<Props> = ({ name }) => {
  // font-weight: ${theme.fontWeight.bold};
  // font-size: ${theme.fontSize.xl};
  // display: flex;
  // flex-direction: row;
  // align-items: center;
  return (
    <div
      style={{ color: "#333" }}
      className="header-grid bg-white flex justify-center items-center p-4"
    >
      <h1 className="font-bold text-xl flex items-center">
        <HashtagIcon />
        {name}
      </h1>
    </div>
  );
};

export default Header;
