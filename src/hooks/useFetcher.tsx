import { useSuspenseQueries } from "@tanstack/react-query";
import axios from "axios";

export const useFetchers = (urls: (string | undefined)[]) => {
  const options = {
    gcTime: 0,
    retry: 0,
    refetchIntervalInBackground: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  };
  return useSuspenseQueries({
    queries: urls
      .filter((url): url is string => !!url)
      .map((url) => ({
        queryKey: ["fetcher", url],
        queryFn: () => axios.get(url),
        ...options,
      })),
  });
};
