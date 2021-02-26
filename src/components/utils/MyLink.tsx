import React, { InputHTMLAttributes, LinkHTMLAttributes } from "react";
import NextLink, { LinkProps } from "next/link";

const MyLink: React.FC<LinkProps> = ({ children, ...props }) => {
  return (
    <NextLink {...props} passHref>
      <a>{children}</a>
    </NextLink>
  );
};
export default MyLink;
