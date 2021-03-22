import React, { useEffect, useRef } from "react";
import {
  DirectMessageSnippetFragment,
  MeSnippetFragment,
  MessageSnippetFragment,
} from "../../generated/graphql";
import { useScrollToBottom } from "../../utils/hooks/useScrollToBottom";
import FileUpload from "../FileUpload";
import MessageContainer from "../Message/MessageContainer";
import Button from "../Button";

interface Props {
  data: MessageSnippetFragment[] | DirectMessageSnippetFragment[];
  me: MeSnippetFragment;
  fetchMore: any;
  channelId: number;
  hasMore: boolean;
  loading: boolean;
}

const RegularMessagesWrapper: React.FC<Props> = ({
  data,
  me,
  fetchMore,
  channelId,
  hasMore,
  loading,
}) => {
  useEffect(() => {
    setTimeout(() => {
      useScrollToBottom(chatContainer);
    }, 10);
    console.log("updateddd");
  }, [data]);

  const body = [...data]
    .reverse()
    .map((message: MessageSnippetFragment | DirectMessageSnippetFragment) => (
      <MessageContainer
        isCreator={me?.id === message?.creator.id}
        message={message}
        key={`message-${message.id}`}
      />
    ));

  const chatContainer = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (chatContainer.current.scrollTop === 0 && hasMore && !loading) {
      fetchMore({
        variables: {
          input: {
            channelId,
            limit: 5,
            cursor: data[data.length - 1].createdAt,
          },
        },
      });

      setTimeout(() => {
        chatContainer.current.scrollTo(0, 240);
      }, 200);
    }
  };
  return (
    <div
      onScroll={handleScroll}
      ref={chatContainer}
      className="p-2 overflow-y-auto bg-white"
    >
      <FileUpload disableClick>
        <div className="p-3">{body}</div>
      </FileUpload>
    </div>
  );
};

export default RegularMessagesWrapper;
