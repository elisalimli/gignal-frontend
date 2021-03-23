import { MutableRefObject } from "react";

/* eslint-disable operator-linebreak */
export const useScrollToBottom = (
  chatContainerRef: MutableRefObject<HTMLDivElement>
) => {
  console.log("asda");
  if (chatContainerRef.current) {
    const scroll =
      chatContainerRef.current.scrollHeight -
      chatContainerRef.current.clientHeight;

    chatContainerRef.current.scrollBy({ top: scroll });
  }
};
