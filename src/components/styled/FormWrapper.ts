import styled from "styled-components";
import { theme } from "./theme";

// bg-gray-100 dark:bg-transparent  flex flex-col shadow-sm max-w-md  mx-auto p-10

export const FormWrapper = styled.div`
  background: ${theme.colors.gray[100]};
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: ${theme.widths.md};
  padding: 2.5rem;
`;
