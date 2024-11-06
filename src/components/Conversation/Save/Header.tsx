import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePreviouseRoomPatchMutate } from "@/hooks/Conversation/usePreviousRoomQuery";
import { useNavigate, useParams } from "react-router-dom";

interface ConversationSaveHeaderProps {
  initialTitle?: string;
}

const ConversationSaveHeader = ({
  initialTitle,
}: ConversationSaveHeaderProps) => {
  const { postId } = useParams();
  if (!postId) throw new Error("postId is required");
  const { mutate: patchRoom } = usePreviouseRoomPatchMutate(postId);
  const navigate = useNavigate();

  const onPatchRoom = () => {
    patchRoom(
      {},
      {
        onSuccess: () => {
          navigate("/");
        },
        onError: () => {
          alert("저장에 실패했습니다.");
          navigate("/");
        },
      },
    );
  };

  return (
    <div className="flex justify-between pb-6">
      <div className="flex items-center">
        <span className="min-w-12 text-lg">제목: </span>
        <Input defaultValue={initialTitle} />
      </div>
      <div className="flex gap-4">
        <Button variant="secondary">홈으로</Button>
        <Button onClick={onPatchRoom}>저장하기</Button>
      </div>
    </div>
  );
};

export default ConversationSaveHeader;
