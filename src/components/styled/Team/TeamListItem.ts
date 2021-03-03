import styled from "styled-components";

const w = 45;

export const TeamListItem = styled.li`
  min-height: ${(props: any) => props.w}px;
  min-width: ${(props: any) => props.w}px;
  max-height: ${(props: any) => props.w}px;
  max-width: ${(props: any) => props.w}px;
  background-color: #676066;
  color: #fff;
  margin: 0 auto;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border-radius: 11px;
  &:hover {
    border-style: solid;
    border-width: thick;
    border-color: #767676;
  }
`;
