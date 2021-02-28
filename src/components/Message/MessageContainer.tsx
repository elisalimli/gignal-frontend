import React from "react";
import calendar from "dayjs/plugin/calendar";
import dayjs from "dayjs";

interface Props {
  username: string;
  isCreator: boolean;
  createdAt: string;
  text: string;
}

const MessageContainer: React.FC<Props> = ({
  isCreator,
  username,
  text,
  createdAt,
}) => {
  dayjs.extend(calendar);

  return (
    <div className={`flex flex-col ${isCreator ? "items-start" : "items-end"}`}>
      <div>
        <span className="font-semibold">{username}</span>
        <span className="ml-2 text-gray-400 text-xs">
          {dayjs(createdAt).calendar()}
        </span>
      </div>
      <div className="text-gray-900 message-text">{text}</div>
    </div>
  );
};

export default MessageContainer;
