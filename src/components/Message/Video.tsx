import React from "react";
import { MessageMediaProps } from "./Audio";
import { focusRing } from "../../../styles/global";

const Video: React.FC<MessageMediaProps> = ({ url, fileType }) => {
  return (
    <video className={focusRing} controls width="300px">
      <source src={url} type={fileType} />
    </video>
  );
};

export default Video;
