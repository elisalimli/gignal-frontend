/* eslint-disable no-confusing-arrow */
import React from "react";
import MyLink from "../utils/MyLink";

interface Props {
  text: string | null;
}

const Text: React.FC<Props> = ({ text }) => {
  const space = " ";
  const splittedText = text.split(" ");
  const result = splittedText.map((t, id) =>
    t.startsWith("http") ? (
      <MyLink target="_blank" extraClassName="text-blue-500" href={t}>
        {t} {space}
      </MyLink>
    ) : (
      <span>
        {t} {space}
      </span>
    )
  );
  return <div style={{ wordBreak: "break-all" }}>{result}</div>;
};

export default Text;
