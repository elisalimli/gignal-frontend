import React from "react";
import styled, { StyledFunction } from "styled-components";

interface MessageWrapperProps {
  isCreator?: boolean;
}

type Props = MessageWrapperProps & React.HTMLProps<HTMLDivElement>;

const input: StyledFunction<Props> = styled.div;

export const MessageWrapper = input`
    display: flex;
    flex-direction: column;
    align-items: ${(props: Props) => {
      return props.isCreator ? "flex-start" : "flex-end";
    }}
  `;
