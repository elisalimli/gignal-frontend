import React from "react";
import MessageContainer from "../Message/MessageContainer";
import {
  MessageSnippetFragment,
  DirectMessageSnippetFragment,
} from "../../generated/graphql";

interface Props {
  message: DirectMessageSnippetFragment;
  isCreator: boolean;
}

const DirectMessage: React.FC<Props> = ({
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

export default DirectMessage;
