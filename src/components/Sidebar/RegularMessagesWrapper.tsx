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
}

const RegularMessagesWrapper: React.FC<Props> = ({
  data,
  me,
  fetchMore,
  channelId,
  hasMore,
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
  // console.log(data[data.length - 1].createdAt);

  return (
    <div
      ref={chatContainer}
      className="p-2 overflow-y-auto scroll-smooth bg-white"
    >
      <FileUpload disableClick>
        <div className="p-3">
          {hasMore && (
            <Button
              onClick={() => {
                fetchMore({
                  variables: {
                    input: {
                      channelId,
                      limit: 5,
                      cursor: data[data.length - 1].createdAt,
                    },
                  },
                  // updateQuery: (prev, { subscriptionData }) => {
                  //   if (!subscriptionData) {
                  //     return prev;
                  //   }

                  //   console.log(
                  //     "baklava prev",
                  //     prev,
                  //     "baklava sub data",
                  //     subscriptionData
                  //   );

                  //   return {
                  //     ...prev,
                  //     // messages: [
                  //     //   subscriptionData.newChannelMessage,
                  //     //   ...prev.messages,
                  //     // ],
                  //   };
                  // },
                });
              }}
              centered
              borderRadius="lg"
              variant="solid"
              type="button"
            >
              Load more
            </Button>
          )}
          {body}
        </div>
      </FileUpload>
    </div>
  );
};

export default RegularMessagesWrapper;
