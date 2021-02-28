import React from "react";
import { MessageSnippetFragment } from "../../generated/graphql";
import MessageContainer from "./MessageContainer";

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
  return (
    <MessageContainer
      text={text}
      createdAt={createdAt}
      username={username}
      isCreator={isCreator}
    />
  );
};

export default Message;
