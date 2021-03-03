import React, {
  ButtonHTMLAttributes,
  JSXElementConstructor,
  ReactElement,
} from "react";
import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { IconWrapper } from "../styled/IconWrapper";

interface Props {
  onClick?: any;
  w?: string;
  h?: string;
}

const MyIcon: React.FC<Props> = ({
  children,
  onClick = () => {},
  w = "36px",
  h = "28px",
}) => {
  return (
    <IconWrapper w={w} h={h}>
      <button type="button" onClick={onClick}>
        {children}
      </button>
    </IconWrapper>
  );
};

export default MyIcon;
