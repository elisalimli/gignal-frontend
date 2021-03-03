import React from "react";
import Channels from "../components/Sidebar/Channels";
import Teams from "../components/Sidebar/Teams";

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
