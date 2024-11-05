import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import usePreviousRoomQuery from "@/hooks/Conversation/usePreviousRoomQuery";
import { Link, useSearchParams } from "react-router-dom";
import PreviousRoomsPagination from "@/components/PreviousRoom/Pagination";
import { timeDiffString, unixtimeConvertorToKorean } from "@/lib/time";

const PreviousRoom = () => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const { previousRoom, isLoading } = usePreviousRoomQuery(currentPage);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (!previousRoom) {
    return <div>데이터가 없어요...</div>;
  }

  return (
    <>
      <div className="h-24 py-8">
        <Link to="/room/create" className="ml-12 flex items-center gap-4 p-4">
          <img src="/favicon.png" alt="facivon" className="h-8 w-8" />
          <div className="text-lg">Code-Sync</div>
        </Link>
      </div>
      <div className="m-auto w-full max-w-[70rem] flex-col pt-12">
        <div className="flex flex-col gap-2 border-b-2 pb-3">
          <h1 className="text-3xl font-semibold">이전 기록</h1>
        </div>
        <Table className="my-12">
          <TableHeader>
            <TableRow className="font-bold hover:bg-white">
              <TableHead>제목</TableHead>
              <TableHead>진행시간</TableHead>
              <TableHead>회의 날짜</TableHead>
              <TableHead>기록 보기</TableHead>
              <TableHead>공개 여부</TableHead>
              <TableHead>PR 리뷰자</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {previousRoom.data.conversations.map((conversation, index) => (
              <TableRow key={index}>
                <TableCell>{conversation.title}</TableCell>
                <TableCell>
                  {timeDiffString(
                    conversation.finishedAt,
                    conversation.startedAt,
                  )}
                </TableCell>
                <TableCell>
                  {unixtimeConvertorToKorean(conversation.finishedAt)}
                </TableCell>
                <TableCell>{conversation.participant.email}</TableCell>
                <TableCell>O</TableCell>
                <TableCell>{conversation.creator.name}</TableCell>
                <TableCell className="flex justify-end gap-4">
                  <Button variant="destructive">삭제하기</Button>
                  <Button variant="default">수정하기</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-end">
          <PreviousRoomsPagination
            data={previousRoom.data}
          ></PreviousRoomsPagination>
        </div>
      </div>
    </>
  );
};

export default PreviousRoom;
