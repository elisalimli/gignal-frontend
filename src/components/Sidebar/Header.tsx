import { useRouter } from "next/router";
import React from "react";
import { useGetTeamIdFromUrl } from "../../../hooks/useGetTeamIdFromUrl";
import {
  useChannelQuery,
  ChannelsSnippetFragment,
} from "../../generated/graphql";
import HashtagIcon from "../icons/HashtagIcon";

interface Props {
  name: string;
}

const Header: React.FC<Props> = ({ name }) => {
  return (
    <div className="header box">
      <h1 className="text-xl font-bold ">
        <HashtagIcon />
        {name}
      </h1>
    </div>
  );
};

export default Header;
