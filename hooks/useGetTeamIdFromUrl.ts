/* eslint-disable import/prefer-default-export */
import { useRouter } from "next/router";

export const useGetTeamIdFromUrl = (param) => {
  let id = -1;
  if (typeof param === "string") {
    id = parseInt(param);
  }
  return id;
};
