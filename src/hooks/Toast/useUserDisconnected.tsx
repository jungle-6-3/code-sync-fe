import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export interface SocketUserDisconnected {
  message: string;
  data: {
    email: string;
    name: string;
    peerId: string;
  };
}

const useUserDisconnectedToast = () => {
  const onToast = ({ message }: SocketUserDisconnected) =>
    toast.custom(
      (t) => (
        <div className="flex w-80 items-center justify-between rounded-lg border bg-white px-4 py-2">
          {message}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              toast.dismiss(t);
            }}
          >
            확인
          </Button>
        </div>
      ),
      { duration: Infinity },
    );

  return { onToast };
};

export default useUserDisconnectedToast;
