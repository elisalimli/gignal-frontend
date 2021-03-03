import React from "react";
import styled, { StyledFunction } from "styled-components";
import { theme } from "./theme";

export const StyledBubble = styled.span`
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  margin-right: 0.25rem;
  border-radius: 9999px;
  background: ${(props: any) => {
    return props.on === "online"
      ? theme.colors.green[500]
      : theme.colors.red[600];
  }};
` as any;
