// eslint-disable-next-line import/no-extraneous-dependencies
import { Spinner } from "@chakra-ui/spinner";
import React from "react";

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Spinner />
    </div>
  );
};

export default Loading;
