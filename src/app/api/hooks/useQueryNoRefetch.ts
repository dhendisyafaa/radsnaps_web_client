"use client";

import { useQuery } from "@tanstack/react-query";

const useQueryNoRefecth = (
  queryKey,
  queryFn,
  options = { enabled: true, forceEnable: false }
) => {
  const { data, isFetching, ...rest } = useQuery({
    queryKey,
    queryFn,
    ...options,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    gcTime: 2 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
  });

  return { data, isFetching, ...rest };
};

export default useQueryNoRefecth;
