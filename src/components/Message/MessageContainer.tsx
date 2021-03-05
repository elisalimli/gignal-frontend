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

const MessageContainer: React.FC<Props> = ({
  isCreator,
  username,
  text,
  createdAt,
}) => {
  dayjs.extend(calendar);
  console.log("is creator", isCreator);
  return (
    <MessageWrapper isCreator={isCreator}>
      <div>
        <MessageUsername>{username}</MessageUsername>
        <MessageDate>{dayjs(createdAt).calendar()}</MessageDate>
      </div>
      <MessageText>{text}</MessageText>
    </MessageWrapper>
  );
};

export default MessageContainer;
