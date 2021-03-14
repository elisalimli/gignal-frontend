import LinkifyIt from "linkify-it";
import React from "react";
import tlds from "tlds";
import MyLink from "./utils/MyLink";

const defaultComponentDecorator = (
  decoratedHref: string,
  decoratedText: string,
  key: number
): React.ReactNode => {
  return (
    <MyLink
      extraClassName="text-blue-500"
      target="_blank"
      href={decoratedHref}
      key={key}
    >
      {decoratedText}
    </MyLink>
  );
};

const defaultTextDecorator = (text: string): string => {
  return text;
};

const defaultHrefDecorator = (href: string): string => {
  return href;
};

const linkify = new LinkifyIt();
linkify.tlds(tlds);

const defaultMatchDecorator = (text: string): Array<Object> => {
  return linkify.match(text);
};

type Props = {
  children: React.ReactNode;
  componentDecorator: (string, string, number) => React.ReactNode;
  hrefDecorator: (string) => string;
  matchDecorator: (string) => Array<Object>;
  textDecorator: (string) => string;
};

export default class Linkify extends React.Component<Props, {}> {
  static defaultProps = {
    componentDecorator: defaultComponentDecorator,
    hrefDecorator: defaultHrefDecorator,
    matchDecorator: defaultMatchDecorator,
    textDecorator: defaultTextDecorator,
  };

  parseString(string: string) {
    if (string === "") {
      return string;
    }

    const matches = this.props.matchDecorator(string);
    if (!matches) {
      return string;
    }

    const elements = [];
    let lastIndex = 0;
    matches.forEach((match, i) => {
      // Push preceding text if there is any
      if (match.index > lastIndex) {
        elements.push(string.substring(lastIndex, match.index));
      }

      const decoratedHref = this.props.hrefDecorator(match.url);
      const decoratedText = this.props.textDecorator(match.text);
      const decoratedComponent = this.props.componentDecorator(
        decoratedHref,
        decoratedText,
        i
      );
      elements.push(decoratedComponent);

      lastIndex = match.lastIndex;
    });

    // Push remaining text if there is any
    if (string.length > lastIndex) {
      elements.push(string.substring(lastIndex));
    }

    return elements.length === 1 ? elements[0] : elements;
  }

  parse(children: any, key: number = 0) {
    if (typeof children === "string") {
      return this.parseString(children);
    } else if (
      React.isValidElement(children) &&
      children.type !== "a" &&
      children.type !== "button"
    ) {
      return React.cloneElement(
        children,
        { key: key },
        this.parse(children.props.children)
      );
    } else if (Array.isArray(children)) {
      return children.map((child, i) => this.parse(child, i));
    }

    return children;
  }

  render(): React.ReactNode {
    return (
      <div style={{ wordBreak: "break-word" }}>
        {this.parse(this.props.children)}
      </div>
    );
  }
}
