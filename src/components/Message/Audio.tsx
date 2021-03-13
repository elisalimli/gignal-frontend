/* eslint-disable jsx-a11y/media-has-caption */
import React from "react";
import { focusRing } from "../../../styles/global";

export interface MessageMediaProps {
  url: string;
  fileType: string;
}

const Audio: React.FC<MessageMediaProps> = ({ url, fileType }) => {
  return (
    <audio className={focusRing} controls>
      <source src={url} type={fileType} />
    </audio>
  );
};

export default Audio;
