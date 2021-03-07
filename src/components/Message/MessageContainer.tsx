import React from "react";
import calendar from "dayjs/plugin/calendar";
import dayjs from "dayjs";
import { MessageWrapper } from "../styled/Message/MessageWrapper";
import { MessageUsername } from "../styled/Message/MessageUsername";
import { MessageDate } from "../styled/Message/MessageDate";
import { MessageText } from "../styled/Message/MessageText";

interface Props {
  username: string;
  isCreator: boolean;
  createdAt: string;
  text: string;
}

// display: flex;
// flex-direction: column;
// align-items: ${(props: Props) => {
//   return props.isCreator ? "flex-start" : "flex-end";
// }}

const MessageContainer: React.FC<Props> = React.memo(
  ({ isCreator, username, text, createdAt }) => {
    dayjs.extend(calendar);

    const position = isCreator ? "items-start" : "items-end";

    return (
      <div className={`flex flex-col ${position}`}>
        <div>
          <span className="font-semibold">{username}</span>
          <span className="ml-2 text-xs text-gray-light">
            {dayjs(createdAt).calendar()}
          </span>
        </div>
        <div className="max-w-full text-gray-900">{text}</div>
      </div>
    );
  }
);

export default MessageContainer;
