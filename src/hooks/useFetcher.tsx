import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetcher = ({ url }: { url: string }) => {
  return useQuery({
    queryKey: [url],
    queryFn: () => axios.get(url),
  });
};
