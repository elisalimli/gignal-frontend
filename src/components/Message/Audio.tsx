import React from "react";
import AudioPlayer from "../Audio";

export interface MessageMediaProps {
  url: string;
  fileType: string;
}

const Audio: React.FC<MessageMediaProps> = ({ url, fileType }) => {
  return (
    <div style={{ width: 300 }}>
      <AudioPlayer src={url} />
    </div>
  );
};

export default Audio;
