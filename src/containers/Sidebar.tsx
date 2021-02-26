import React from "react";
import Teams from "../components/Sidebar/Teams";
import Channels from "../components/Sidebar/Channels";

interface Props {}

const Sidebar: React.FC<Props> = () => {
  return (
    <>
      <Teams />
      <Channels />
    </>
  );
};

export default Sidebar;
