import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePreviouseRoomPatchMutate } from "@/hooks/Conversation/usePreviousRoomQuery";
import { usePreviousRoomStore } from "@/stores/previousRoom.store";
import { Switch } from "@/components/ui/switch";
import { fromUint8Array } from "js-base64";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Y from "yjs";
import { useQueryClient } from "@tanstack/react-query";

const ydocToBase64 = (ydoc: Y.Doc) => {
  const documentState = Y.encodeStateAsUpdate(ydoc);
  const base64Encoded = fromUint8Array(documentState);
  return base64Encoded;
};

interface BodyType {
  note: { data: string; isShared: boolean };
  drawBoard: { data: string; isShared: boolean };
  chat: { isShared: boolean };
  voice: { isShared: boolean };
  canShared: boolean;
  title: string;
}

const ConversationSaveHeader = () => {
  const { postId } = useParams();
  if (!postId) throw new Error("postId is required");
  const { mutate: patchRoom } = usePreviouseRoomPatchMutate(postId);
  const noteYDoc = usePreviousRoomStore((state) => state.noteYdoc);
  const drawBoardYDoc = usePreviousRoomStore((state) => state.drawBoardYdoc);
  const setCanShared = usePreviousRoomStore((state) => state.setCanShared);
  const canShared = usePreviousRoomStore((state) => state.canShared);
  const navigate = useNavigate();
  const drawIsShared = usePreviousRoomStore((state) => state.drawIsShared);
  const queryClient = useQueryClient();
  const noteIsShared = usePreviousRoomStore((state) => state.noteIsShared);
  const chatIsShared = usePreviousRoomStore((state) => state.chatIsShared);
  const voiceIsShared = usePreviousRoomStore((state) => state.voiceIsShared);
  const title = usePreviousRoomStore((state) => state.title);
  const setTitle = usePreviousRoomStore((state) => state.setTitle);

  const onPatchRoom = () => {
    const body: BodyType = {
      note: { data: ydocToBase64(noteYDoc), isShared: noteIsShared },
      drawBoard: { data: ydocToBase64(drawBoardYDoc), isShared: drawIsShared },
      chat: { isShared: chatIsShared },
      voice: { isShared: voiceIsShared },
      canShared: canShared,
      title: title,
    };
    patchRoom(body, {
      onError: () => {
        alert("저장에 실패했습니다.");
      },
      onSuccess: ({ message }: { message: string }) => {
        alert(message);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["room", postId] });
        navigate(`/room/${postId}`);
      },
    });
  };

  return (
    <div className="flex justify-between pb-6">
      <div className="flex items-center">
        <span className="min-w-12 text-lg">제목: </span>
        <Input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <div className="flex gap-4">
        <div className="my-2 text-sm font-light">
          {canShared ? "공개" : "비공개"}
        </div>
        <Switch
          className="my-2"
          checked={canShared}
          onCheckedChange={setCanShared}
        />
        <Button variant="secondary" asChild>
          <Link to="/room">목록으로</Link>
        </Button>
        <Button onClick={onPatchRoom}>저장하기</Button>
      </div>
    </div>
  );
};

export default ConversationSaveHeader;
