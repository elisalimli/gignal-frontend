import React from "react";

interface Props {}

const Container: React.FC<Props> = ({ children }) => {
  return <div className="max-w-screen-2xl mx-auto">{children}</div>;
};

export default Container;
