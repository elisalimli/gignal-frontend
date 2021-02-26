import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import React from "react";
import { MessageSnippetFragment } from "../../generated/graphql";

interface Props {
  message: MessageSnippetFragment;
  isCreator: boolean;
}

const Message: React.FC<Props> = ({
  message: {
    text,
    createdAt,
    creator: { username },
  },
  isCreator,
}) => {
  dayjs.extend(localizedFormat);

  console.log(createdAt);
  return (
    <div className={`flex flex-col ${isCreator ? "items-start" : "items-end"}`}>
      <div>
        <span className="font-semibold">{username}</span>
        <span className="ml-2 text-gray-400 text-xs">
          {dayjs(new Date(createdAt).toISOString()).format("DD  ")} A
        </span>
      </div>
      <div className="text-gray-900 message-text">{text}</div>
    </div>
  );
};

export default Message;
