import React, { InputHTMLAttributes, LinkHTMLAttributes, Props } from "react";
import NextLink, { LinkProps } from "next/link";

type MyLinkProps = LinkProps & {
  extraClassName?: string;
  target?: string;
};
const MyLink: React.FC<MyLinkProps> = ({
  children,
  extraClassName,
  target,
  ...props
}) => {
  return (
    <NextLink {...props} passHref>
      <a target={target} className={extraClassName}>
        {children}
      </a>
    </NextLink>
  );
};
export default MyLink;
