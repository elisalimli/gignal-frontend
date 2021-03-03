import React from "react";
import HashtagIcon from "../icons/HashtagIcon";
import { HeaderWrapper, HeaderName } from "../styled/HeaderWrapper";

interface Props {
  name: string;
}

const Header: React.FC<Props> = ({ name }) => {
  return (
    <HeaderWrapper>
      <HeaderName>
        <HashtagIcon />
        {name}
      </HeaderName>
    </HeaderWrapper>
  );
};

export default Header;
