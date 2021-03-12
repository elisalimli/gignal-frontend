/* eslint-disable jsx-a11y/media-has-caption */
import React from "react";

export interface MessageMediaProps {
  url: string;
  fileType: string;
}

const Audio: React.FC<Props> = ({ url, fileType }) => {
  return (
    <audio controls>
      <source src={url} type={fileType} />
    </audio>
  );
};

export default Audio;
