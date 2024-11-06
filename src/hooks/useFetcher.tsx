import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetcher = ({ url }: { url: string }) => {
  return useSuspenseQuery({
    queryKey: [url],
    queryFn: () => axios.get(url),
    gcTime: 0,
    retry: 0,
    refetchIntervalInBackground: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};
