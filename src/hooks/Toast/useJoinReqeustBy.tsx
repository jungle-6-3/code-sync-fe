import { Button } from "@/components/ui/button";
import { SocketManager } from "@/lib/socketManager";
import { useCommunicationStore } from "@/stores/communicationState.store";
import { toast } from "sonner";

export interface SocketJoinRequestBy {
  message: string;
  data: {
    participant: {
      name: string;
      email: string;
    };
  };
}

const useJoinRequestByToast = () => {
  const isSocketManagerReady = useCommunicationStore(
    (state) => state.isSocketManagerReady,
  );
  if (!isSocketManagerReady) throw new Error("socketManager is not ready");

  const socket = SocketManager.getInstance().socketIOSocket;

  const onInvite = (t: string | number, { data }: SocketJoinRequestBy) => {
    socket.emit("invite-user", { email: data.participant.email });
    toast.dismiss(t);
  };

  const onReject = (t: string | number, { data }: SocketJoinRequestBy) => {
    socket.emit("reject-user", { email: data.participant.email });
    toast.dismiss(t);
  };

  const onToast = ({ data, message }: SocketJoinRequestBy) =>
    toast.custom(
      (t) => (
        <div className="flex w-[23rem] items-center justify-between rounded-lg border bg-white px-4 py-2">
          {`${data.participant.name}의 ${message}`}
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => onReject(t, { data, message })}
            >
              거절
            </Button>
            <Button onClick={() => onInvite(t, { data, message })}>수락</Button>
          </div>
        </div>
      ),
      { duration: Infinity },
    );
  return { onToast };
};

export default useJoinRequestByToast;
