// eslint-disable-next-line import/no-extraneous-dependencies
import { Spinner } from "@chakra-ui/spinner";
import React from "react";
import { LoaderWrapper } from "../styled/LoaderWrapper";

const Loading = () => {
  return (
    <LoaderWrapper>
      <Spinner />
    </LoaderWrapper>
  );
};

export default Loading;
