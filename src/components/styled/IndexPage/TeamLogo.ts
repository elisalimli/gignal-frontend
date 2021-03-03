import styled from "styled-components";
import { theme } from "../theme";
// mx-auto team_list text-2xl mb-2 w-16 h-16 flex items-center rounded-lg justify-center text-white

export const TeamLogo = styled.div`
   margin:0 auto;
   background-color: #677066;
   border-radius: 11px;
   min-width: 2.5rem;
   min-height: 2.5rem;
   font-size:${theme.fontSize["2xl"]}
   margin-bottom:0.5rem;
   width:4rem;
   height:4rem;
   display:flex
   align-items:center;
   justify-content:center;
   border-radius:${theme.borderRadius.lg}
   color:${theme.colors.white}
`;
