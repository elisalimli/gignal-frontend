import { MutableRefObject } from "react";

/* eslint-disable operator-linebreak */
export const useScrollToBottom = (chatContainerRef: MutableRefObject<any>) => {
  if (chatContainerRef.current) {
    const scroll =
      chatContainerRef.current.scrollHeight -
      chatContainerRef.current.clientHeight;
    chatContainerRef.current.scrollTo(0, scroll);
  }
};
