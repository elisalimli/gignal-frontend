import React from "react";
import { MessageMediaProps } from "./Audio";

const Video: React.FC<MessageMediaProps> = ({ url, fileType }) => {
  return (
    <video controls width="300px">
      <source src={url} type={fileType} />
    </video>
  );
};

export default Video;
