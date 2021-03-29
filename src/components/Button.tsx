/* eslint-disable react/button-has-type */
import React from "react";
import Loader from "react-loader-spinner";
import { BorderRadiusTypes } from "../types/css/BorderRadiusTypes";

const borderRadiusClassnames = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

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
  borderRadius: keyof typeof borderRadiusClassnames;
  padding?: string;
}
const style = {
  common: `border-0 focus:outline-none text-lg flex items-center justify-center transition-colors duration-300`,
  solid: "bg-purple-500 hover:bg-purple-600 text-white",
  outline: "hover:bg-gray-200",
  icon: "bg-gray-200 hover:bg-gray-300 text-gray-500 py-1 px-3",
};

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
  const extraStyles = `${centered ? "mx-auto" : ""} ${
    borderRadius ? `rounded-${borderRadius}` : ""
  }`;

  return (
    <button
      onClick={onClick}
      className={`${style.common} ${extraStyles} ${style[variant]} ${extraClassName} ${padding} `}
      style={{ minWidth: width, height }}
      type={type}
      disabled={disabled}
    >
      <span className={loading ? "opacity-0  bg-red-500" : `flex items-center`}>
        {children}
      </span>
      {loading ? (
        <span className="absolute">
          <Loader type="TailSpin" color="#fff" height={25} width={25} />
        </span>
      ) : null}
    </button>
  );
};

export default Button;
