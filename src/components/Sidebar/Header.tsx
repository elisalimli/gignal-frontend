import React from "react";
import HashtagIcon from "../icons/HashtagIcon";

interface Props {
  name: string;
}

const Header: React.FC<Props> = ({ name }) => {
  return (
    <div
      style={{ color: "#333" }}
      className="header-grid bg-white flex justify-center items-center p-4 font-bold text-xl"
    >
      <HashtagIcon />
      {name}
    </div>
  );
};

export default Header;
