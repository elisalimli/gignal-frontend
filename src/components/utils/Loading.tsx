// eslint-disable-next-line import/no-extraneous-dependencies
import { Spinner } from "@chakra-ui/spinner";
import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen min-w-full flex items-center justify-center">
      <Spinner />
    </div>
  );
};

export default Loading;
