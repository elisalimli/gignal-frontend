import React from "react";

export interface WrapperProps {
  isMobileFull?: Boolean;
}

const Wrapper: React.FC<WrapperProps> = ({
  children,
  isMobileFull = false,
}) => {
  return (
    <div
      className={`font-roboto min-h-screen 
       dark:bg-gray-dark transition-colors duration-100  dark:text-white ${
         isMobileFull ? "p-2" : "p-12"
       }`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
