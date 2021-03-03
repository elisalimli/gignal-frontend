import React, { useEffect, useRef } from "react";
import {
  DirectMessageSnippetFragment,
  MeSnippetFragment,
  MessageSnippetFragment,
} from "../../generated/graphql";
import { useScrollToBottom } from "../../utils/hooks/useScrollToBottom";
import MessageContainer from "../Message/MessageContainer";
import { MessagesWrapper } from "../styled/Message/MessagesWrapper";

interface Props {
  data: MessageSnippetFragment[] | DirectMessageSnippetFragment[];
  me: MeSnippetFragment;
}

const RegularMessagesWrapper: React.FC<Props> = ({ data, me }) => {
  useEffect(() => useScrollToBottom(chatContainer), [data]);

  const chatContainer = useRef(null);
  return (
    <MessagesWrapper ref={chatContainer}>
      {data.map(
        ({
          createdAt,
          text,
          id,
          creator: { id: creatorId, username },
        }: MessageSnippetFragment | DirectMessageSnippetFragment) => (
          <MessageContainer
            createdAt={createdAt}
            text={text}
            username={username}
            isCreator={creatorId === me?.id}
            key={`${id}-message`}
          />
        )
      )}
    </MessagesWrapper>
  );
};

export default RegularMessagesWrapper;
