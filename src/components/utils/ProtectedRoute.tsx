import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Loading from "./Loading";
import { useMeQuery } from "../../generated/graphql";

const ProtectedRoute = ({ children }) => {
  const { loading, data } = useMeQuery();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !data?.me) {
      if (router.pathname.includes("/team")) {
        router.replace(`/login?next=/`);
      } else router.replace(`/login?next=${router.pathname}`);
    }
  }, [data, router, loading]);

  if (data?.me) return children;

  return <Loading />;
};

export default ProtectedRoute;
