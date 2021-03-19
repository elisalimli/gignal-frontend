import React from "react";
import AudioPlayer from "../Audio";

export interface MessageMediaProps {
  url: string;
  fileType: string;
}

const Audio: React.FC<MessageMediaProps> = ({ url, fileType }) => {
  return (
    <div style={{ width: 300 }}>
      <AudioPlayer
        src={url}
        showSkipControls={false}
        showJumpControls={false}
        loop={false}
      />
    </div>
  );
};

export default Audio;
