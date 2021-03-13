import React from "react";
import { focusRing } from "../../../styles/global";
import { BorderRadiusTypes } from "../../types/css/BorderRadiusTypes";

interface Props {
  onClick?: any;
  w?: string;
  h?: string;
  className?: string;
  borderRadius?: BorderRadiusTypes;
}
const commonStyle = `transition-colors duration-500 p-1 flex justify-center ${focusRing}`;

const MyIcon: React.FC<Props> = ({
  children,
  onClick = () => {},
  borderRadius = "lg",
  className,
}) => {
  const extraClassName = className ? className : null;
  return (
    <button
      className={`${commonStyle} ${extraClassName} rounded-${borderRadius}`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default MyIcon;
