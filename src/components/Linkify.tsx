/* eslint-disable no-else-return */
import React from "react";
import linkify from "linkifyjs";
import mention from "linkifyjs/plugins/mention";
import Linkify from "linkifyjs/react";
// import hashtag from "linkifyjs/plugins/hashtag";
import MyLink from "./utils/MyLink";

mention(linkify);
// hashtag(linkify);
interface LinkProps {
  to?: string;
}

const Url: React.FC<LinkProps> = ({ to, children }) => {
  return (
    <MyLink extraClassName="text-blue-500" target="_blank" href={to}>
      {children}
    </MyLink>
  );
};

const Mention: React.FC<LinkProps> = ({ to, children }) => {
  return (
    <MyLink extraClassName="text-blue-500" href={to}>
      {children}
    </MyLink>
  );
};

const options = {
  tagName: {
    mention: () => Mention,
    url: () => Url,
  },
  attributes: (href, type) => {
    console.log("type", type, href);
    if (type === "mention") {
      return {
        to: `/user${href}`,
      };
    } else if (type === "url") {
      return { to: href };
    }
    return {};
  },
};

interface Props {}

const Main: React.FC<Props> = ({ children }) => {
  return <Linkify options={options}>{children}</Linkify>;
};

export default Main;
