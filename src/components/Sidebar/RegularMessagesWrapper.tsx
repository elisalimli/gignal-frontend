import React, { useEffect, useRef } from "react";
import {
  DirectMessageSnippetFragment,
  MeSnippetFragment,
  MessageSnippetFragment,
} from "../../generated/graphql";
import { useScrollToBottom } from "../../utils/hooks/useScrollToBottom";
import FileUpload from "../FileUpload";
import MessageContainer from "../Message/MessageContainer";

interface Props {
  data: MessageSnippetFragment[] | DirectMessageSnippetFragment[];
  me: MeSnippetFragment;
}

const RegularMessagesWrapper: React.FC<Props> = ({ data, me }) => {
  useEffect(() => useScrollToBottom(chatContainer), [data]);

  const chatContainer = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={chatContainer}
      className="p-2 messages bg-white overflow-y-auto scroll-smooth"
    >
      <FileUpload disableClick>
        <div className="p-3">
          {data.map(
            (
              message: MessageSnippetFragment | DirectMessageSnippetFragment
            ) => (
              <MessageContainer
                isCreator={me?.id === message?.creator.id}
                message={message}
                key={`message-${message.id}`}
              />
            )
          )}
        </div>
      </FileUpload>
    </div>
  );
};

export default RegularMessagesWrapper;
