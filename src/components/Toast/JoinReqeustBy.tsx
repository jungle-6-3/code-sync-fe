import { Button } from "@/components/ui/button";
import { ConversationSocket, SocketJoinRequestBy } from "@/lib/socket";
import { toast } from "sonner";

const JoinRequestByToast = ({ data, message }: SocketJoinRequestBy) => {
  const socket = ConversationSocket.getInstance();
  toast.custom(
    (t) => (
      <div className="flex w-80 items-center justify-between rounded-lg border bg-white px-4 py-2">
        {`${data.participant.name}의 ${message}`}
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              toast.dismiss(t);
            }}
          >
            거절
          </Button>
          <Button
            onClick={() => {
              socket.socketInviteUser({ email: data.participant.email });
              toast.dismiss(t);
            }}
          >
            수락
          </Button>
        </div>
      </div>
    ),
    { duration: Infinity },
  );
};

export default JoinRequestByToast;
