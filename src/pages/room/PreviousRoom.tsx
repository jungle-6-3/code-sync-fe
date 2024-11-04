import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import usePreviousRoomQuery from "@/hooks/Conversation/usePreviousRoomQuery";
import { Conversation } from "@/apis/conversation/dtos";
import { useNavigate, useSearchParams } from "react-router-dom";
import PreviousRoomsPagination from "@/components/PreviousRoom/Pagination";

const PreviousRoom = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const navigate = useNavigate();

  const { previousRoom, isLoading } = usePreviousRoomQuery(currentPage);
  if (isLoading) {
    return <div>로딩 중,,,</div>;
  }

  if (!previousRoom) {
    return <div>데이터가 없어요,,</div>;
  }

  return (
    <div className="relative my-10 flex h-screen flex-[3_1_0] flex-col items-center justify-start overflow-hidden overflow-x-hidden bg-gradient-to-br">
      <div className="flex w-full max-w-[70rem] flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-300">이전 기록들</h1>
        </div>
        <hr className="border-4" />
        <Table>
          <TableCaption>Code-Sync</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] font-bold">제목</TableHead>
              <TableHead className="font-bold">진행시간</TableHead>
              <TableHead className="font-bold">기록된 날짜</TableHead>
              <TableHead className="font-bold">기록 보기</TableHead>
              <TableHead className="font-bold">공개 여부</TableHead>
              <TableHead className="font-bold">PR 리뷰자</TableHead>
              <TableHead className="font-bold"></TableHead>
              <TableHead className="font-bold"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {previousRoom?.data.conversations.map(
              (conversation: Conversation, index: number) => (
                <TableRow
                  className="cursor-pointer hover:bg-gray-300"
                  key={index}
                  onClick={() => {
                    navigate(`/room/${index + 1}`);
                  }}
                >
                  <TableCell>{conversation.title}</TableCell>
                  <TableCell>
                    {new Date(conversation.startedAt).toLocaleString("ko-KR")}
                  </TableCell>

                  <TableCell>3일 전</TableCell>
                  <TableCell>{conversation.participant.email}</TableCell>
                  <TableCell>O</TableCell>
                  <TableCell>{conversation.creator.name}</TableCell>
                  <TableCell className="text-right">
                    <Button className="bg-red-700 px-2 py-1 text-xs hover:bg-red-400">
                      삭제하기
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button className="flex justify-start bg-gray-500 px-2 py-1 text-xs">
                      수정하기
                    </Button>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex justify-end">
        <PreviousRoomsPagination
          data={previousRoom.data}
        ></PreviousRoomsPagination>
      </div>
    </div>
  );
};

export default PreviousRoom;
