import React, { useCallback, useEffect, useState } from "react";
import Text from "./Text";

interface Props {
  url: string;
}

const RenderText: React.FC<Props> = ({ url }) => {
  const [text, setText] = useState(null);

  const asyncFo = useCallback(async () => {
    const response = await fetch(url);
    const parsedText = await response.text();
    setText(parsedText);
  }, []);
  useEffect(() => {
    asyncFo();
  }, []);

  return <Text text={text} />;
};

export default RenderText;
