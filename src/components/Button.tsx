import React from "react";
import { Spinner } from "@chakra-ui/spinner";

interface Props {
  text: string;
  loading: boolean;
  width?: string;
  height?: string;
  type: string;
  extraClassName?: string;
  centered?: boolean;
}

const Button: React.FC<Props> = ({
  text,
  type,
  loading,
  extraClassName,
  width,
  height,
  centered,
}) => {
  let body;
  if (loading) {
    body = <Spinner />;
  } else {
    body = text;
  }
  let style = `text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg flex items-center justify-center ${
    centered ? "mx-auto" : ""
  }`;

  return (
    <button
      style={{ width, height }}
      className={`${style} ${extraClassName}`}
      type={type}
    >
      {body}
    </button>
  );
};

export default Button;
