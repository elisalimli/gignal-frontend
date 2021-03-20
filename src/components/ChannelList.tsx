import React from "react";
import { channelListStyle } from "./Channel/Channel";

interface Props {
  extraClassName?: string;
}

const ChannelList: React.FC<Props> = ({ children, extraClassName = "" }) => {
  return (
    <li className={`${channelListStyle} ${extraClassName}`}>{children}</li>
  );
};

export default ChannelList;
