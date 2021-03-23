import React, { useEffect, useRef, useState } from "react";
import {
  DirectMessageSnippetFragment,
  MeSnippetFragment,
  MessageSnippetFragment,
  MessagesQueryVariables,
} from "../../generated/graphql";
import { useScrollToBottom } from "../../utils/hooks/useScrollToBottom";
import FileUpload from "../FileUpload";
import ChevronUpIcon from "../icons/ChevronUpIcon";
import MessageContainer from "../Message/MessageContainer";

interface Props {
  data: MessageSnippetFragment[] | DirectMessageSnippetFragment[];
  me: MeSnippetFragment;
  fetchMore: any;
  channelId: number;
  hasMore: boolean;
  loading: boolean;
  variables: MessagesQueryVariables;
}

const RegularMessagesWrapper: React.FC<Props> = ({
  data,
  me,
  fetchMore,
  channelId,
  hasMore,
  loading,
  variables,
}) => {
  const [height, setHeight] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      useScrollToBottom(chatContainer);
    }, 10);
    setHeight(chatContainer.current.scrollHeight - 500);
  }, [channelId]);

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
    if (chatContainer.current.scrollTop < height) setShow(true);
    else if (show) setShow(false);

    if (chatContainer.current.scrollTop === 0 && hasMore && !loading) {
      const before = chatContainer.current.scrollHeight;
      fetchMore({
        variables: {
          input: {
            ...variables.input,
            cursor: data[data.length - 1].createdAt,
          },
        },
      });

      const { scrollHeight } = chatContainer.current;

      setTimeout(() => {
        chatContainer.current.scrollTo(0, scrollHeight - 150 - before);
        setHeight(scrollHeight - 500);
      }, 200);
    }
  };

  return (
    <div
      onScroll={handleScroll}
      ref={chatContainer}
      className="p-2 overflow-y-auto scroll-smooth bg-white"
    >
      <FileUpload disableClick>
        <div className="p-3">
          {body}

          <button
            onClick={() => useScrollToBottom(chatContainer)}
            type="button"
            className={`scroll-bottom-button outline-disable fixed bottom-16 right-5 text-white cursor-pointer rounded-full ${
              show
                ? "scroll-bottom-button-active"
                : "scroll-bottom-button-disable"
            }`}
          >
            <ChevronUpIcon />
          </button>
        </div>
      </FileUpload>
    </div>
  );
};

export default RegularMessagesWrapper;
