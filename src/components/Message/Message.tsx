import React from "react";
import { MessageSnippetFragment } from "../../generated/graphql";
import MessageContainer from "./MessageContainer";

interface Props {
  message: MessageSnippetFragment;
  isCreator: boolean;
}

const Message: React.FC<Props> = ({ message, isCreator }) => {
  return <MessageContainer isCreator={isCreator} message={message} />;
};

export default Message;
