export const useGetIdFromUrl = (param) => {
  let id = -1;
  if (typeof param === "string") {
    id = parseInt(param);
  }
  return id;
};
