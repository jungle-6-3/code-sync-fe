import previousMeetingApi from "@/apis/previousMeetingApi";
import { useQuery } from "@tanstack/react-query";

export default function usePreviousMeetingQuery() {
  const { data: previousMeeting } = useQuery({
    queryKey: ["previousMeeting"],
    queryFn: previousMeetingApi,
  });
  return { previousMeeting };
}
