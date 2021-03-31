/* eslint-disable react/button-has-type */
import React, { ButtonHTMLAttributes, useState } from "react";
import Loader from "react-loader-spinner";
import ChevronRightIcon from "./icons/ChevronRightIcon";

const buttonTypes = {
  common: `focus:outline-none text-lg flex items-center justify-center transition-colors duration-300`,
  primary: "bg-primary-100 hover:opacity-95 text-white",
  primaryDark: "bg-channel-bg hover:opacity-95 text-white",
  outlinePrimary:
    "border-1 border-primary-100 hover:bg-primary-100 hover:text-white",
  secondary: "hover:bg-gray-200",
  transparent: "hover:bg-gray-100 focus:bg-gray-200",
  icon: "bg-gray-200 hover:bg-gray-300 text-gray-500 py-1 px-3",
};

const borderRadiusClassnames = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps;

interface ButtonProps {
  loading?: boolean;
  width?: string;
  height?: string;
  type: "button" | "submit" | "reset";
  extraClassName?: string;
  centered?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  variant: keyof typeof buttonTypes;
  borderRadius: keyof typeof borderRadiusClassnames;
  padding?: string;
  arrow?: boolean;
}

const Button: React.FC<Props> = ({
  type,
  loading,
  extraClassName = "",
  width,
  height,
  centered,
  disabled,
  children,
  onClick,
  variant,
  arrow = false,
  borderRadius,
  padding = "py-2 px-6",
}) => {
  const [hover, setHover] = useState(false);

  let extraStyles = "";
  extraStyles += centered ? "mx-auto" : "";
  extraStyles += borderRadius ? borderRadiusClassnames[borderRadius] : "";

  const handleHover = () => setHover(!hover);

  return (
    <button
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      onClick={onClick}
      className={`${buttonTypes.common} ${extraStyles} ${buttonTypes[variant]} ${extraClassName} ${padding} `}
      style={{ minWidth: width, height }}
      type={type}
      disabled={disabled}
    >
      <span className={loading ? "opacity-0" : `flex items-center`}>
        {children}
        {arrow ? <ChevronRightIcon /> : null}
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
