import React from "react";

interface Props {
  onClick?: any;
  w?: string;
  h?: string;
  className?: string;
}

const MyIcon: React.FC<Props> = ({
  children,
  onClick = () => {},
  w = "36px",
  h = "28px",
  className,
}) => {
  return (
    <button className={className} type="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default MyIcon;
