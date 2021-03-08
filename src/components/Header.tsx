import React from "react";

interface Props {
  fontWeight:
    | "hairline"
    | "thin"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
    | "black";
  size:
    | "xs"
    | "sm"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl";
  extraClassName?: string;
}

const Header: React.FC<Props> = ({
  fontWeight,
  size,
  extraClassName = null,
  children,
}) => {
  return (
    <div className={`${extraClassName} text-${size} font-${fontWeight}`}>
      {children}
    </div>
  );
};

export default Header;
