import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePreviousRoomsQuery } from "@/hooks/Conversation/usePreviousRoomQuery";
import { timeDiffString, unixtimeConvertorToKorean } from "@/lib/time";
import { Link, useSearchParams } from "react-router-dom";

const PreviousRoomTable = () => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const { previousRoom, isLoading } = usePreviousRoomsQuery(currentPage);
  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (!previousRoom) {
    return <div>데이터가 없어요...</div>;
  }

  return (
    <Table className="my-12">
      <TableHeader>
        <TableRow className="font-bold hover:bg-white [&>*]:text-center">
          <TableHead className="!text-left">제목</TableHead>
          <TableHead>진행시간</TableHead>
          <TableHead>회의 날짜</TableHead>
          <TableHead>기록 보기</TableHead>
          <TableHead>공개 여부</TableHead>
          <TableHead>PR 리뷰자</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-center">
        {previousRoom.data.conversations.map((conversation, index) => (
          <TableRow key={index} className="hover:bg-white">
            <TableCell className="text-left">{conversation.title}</TableCell>
            <TableCell>
              {timeDiffString(conversation.finishedAt, conversation.startedAt)}
            </TableCell>
            <TableCell>
              {unixtimeConvertorToKorean(conversation.finishedAt)}
            </TableCell>
            <TableCell className="truncate">
              <Link to={`/s/${conversation.conversationDatas.uuid}`}>
                {conversation.conversationDatas.uuid}
              </Link>
            </TableCell>
            <TableCell>
              {conversation.conversationDatas.canShared ? "공개" : "비공개"}
            </TableCell>
            <TableCell>{conversation.participant.name}</TableCell>
            <TableCell className="flex justify-end gap-4">
              <Button variant="destructive">삭제하기</Button>
              <Button variant="default" asChild>
                <Link to={`/room/${conversation.dataPk}`}>수정하기</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PreviousRoomTable;
