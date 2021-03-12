/* eslint-disable react/button-has-type */
import React from "react";
import Loader from "react-loader-spinner";
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
  variant: "solid" | "outline" | "icon";
  borderRadius: BorderRadiusTypes;
  padding?: string;
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
  padding = "py-2 px-6",
}) => {
  let body;
  if (loading) {
    body = <Loader type="TailSpin" color="#fff" height={25} width={25} />;
  } else {
    body = children;
  }

  const extraStyles = `${centered ? "mx-auto" : ""} ${
    borderRadius ? `rounded-${borderRadius}` : ""
  }`;

  const style = {
    common: `border-0 focus:outline-none text-lg flex items-center justify-center transition-colors duration-300`,
    solid: "bg-purple-500 hover:bg-purple-600 text-white",
    outline: "hover:bg-gray-200",
    icon: "bg-gray-200 hover:bg-gray-300 text-gray-500 py-1 px-3",
  };

  return (
    <button
      onClick={onClick}
      style={{ minWidth: width, height }}
      className={`${style.common} ${extraStyles} ${style[variant]} ${extraClassName} ${padding} `}
      type={type}
      disabled={disabled}
    >
      {body}
    </button>
  );
};

export default Button;
