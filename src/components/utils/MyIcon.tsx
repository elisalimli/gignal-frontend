import React, {
  ButtonHTMLAttributes,
  JSXElementConstructor,
  ReactElement,
} from "react";
import { IconButton, IconButtonProps } from "@chakra-ui/react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {};

const MyIcon: React.FC<IconButtonProps & Props> = ({ children, ...props }) => {
  return (
    <IconButton
      {...props}
      size="sm"
      transition="ease-in-out"
      transitionDuration="300ms"
      icon={children as ReactElement<any, string | JSXElementConstructor<any>>}
    />
  );
};

export default MyIcon;
