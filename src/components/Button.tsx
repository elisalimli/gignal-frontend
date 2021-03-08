/* eslint-disable react/button-has-type */
import { Spinner } from "@chakra-ui/spinner";
import React from "react";
import { BorderRadiusTypes } from "../types/css/BorderRadiusTypes";

interface Props {
  loading?: boolean;
  width?: string;
  height?: string;
  type: "button" | "submit" | "reset";
  extraClassName?: string;
  centered?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  variant: "solid" | "outline" | "ghost";
  borderRadius: BorderRadiusTypes;
}

const Button: React.FC<Props> = ({
  type,
  loading,
  extraClassName = null,
  width,
  height,
  centered,
  disabled,
  children,
  onClick,
  variant,
  borderRadius,
}) => {
  let body;
  if (loading) {
    body = <Spinner />;
  } else {
    body = children;
  }

  const extraStyles = `${centered ? "mx-auto" : ""} ${
    borderRadius ? `rounded-${borderRadius}` : ""
  }`;

  const style = {
    common: `border-0 py-2 px-6 focus:outline-none  text-lg flex items-center justify-center`,
    solid: "bg-purple-500 hover:bg-purple-600 text-white",
    outline: "hover:bg-gray-200 ",
  };
  return (
    <button
      onClick={onClick}
      style={{ minWidth: width, height }}
      className={`${style.common} ${extraStyles} ${style[variant]} ${extraClassName}`}
      type={type}
      disabled={disabled}
    >
      {body}
    </button>
  );
};

export default Button;
