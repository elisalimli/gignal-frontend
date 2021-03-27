import { useMeQuery } from "../../generated/graphql";

export const useMe = () => {
  const { data, loading } = useMeQuery();
  return {
    me: data?.me,
    meLoading: loading,
  };
};
