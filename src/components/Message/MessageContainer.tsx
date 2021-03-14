import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import React from "react";
import Text from "./Text";
import {
  MessageSnippetFragment,
  DirectMessageSnippetFragment,
} from "../../generated/graphql";
import RenderText from "./RenderText";
import Audio from "./Audio";
import Video from "./Video";

interface Props {
  message: MessageSnippetFragment | DirectMessageSnippetFragment;
  isCreator: boolean;
}

const MessageContainer: React.FC<Props> = React.memo(
  ({
    message: {
      creator: { username },
      text,
      createdAt,
      url,
      fileType,
    },
    isCreator,
  }) => {
    dayjs.extend(calendar);
    const position = isCreator ? "items-start" : "items-end";

    let body = null;
    if (fileType) {
      const mediaProps = { url, fileType };
      if (fileType.startsWith("image/")) {
        body = (
          <img
            className="mb-2 w-64 h-64 rounded-md"
            alt="message pic"
            src={url}
          />
        );
      } else if (fileType.startsWith("audio/")) {
        body = <Audio {...mediaProps} />;
      } else if (fileType.startsWith("video/")) {
        body = <Video {...mediaProps} />;
      } else if (fileType.startsWith("text/plain")) {
        body = <RenderText url={url} />;
      }
    } else if (text) {
      body = <Text text={text} />;
    }

    return (
      <div className={`flex flex-col ${position} mb-2`}>
        <div>
          <span className="font-semibold">{username}</span>
          <span className="ml-2 text-xs text-gray-light">
            {dayjs(createdAt).calendar()}
          </span>
        </div>
        {body}
      </div>
    );
  }
);

export default MessageContainer;
