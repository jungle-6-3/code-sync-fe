import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import usePreviousMeetingQuery from "@/hooks/Conversation/usePreviousMeetingQuery";
import { useState } from "react";
import { Conversation } from "@/apis/conversation/dtos";

export default function PreviousMeeting() {
  const { previousMeeting } = usePreviousMeetingQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = 2;

  if (!previousMeeting?.data?.conversations) {
    return <div className="text-white">로딩 중...</div>;
  }

  const conversation = previousMeeting?.data.conversations;
  const totalPage = Math.ceil(conversation.length / pageCount);
  const startPage = (currentPage - 1) * pageCount;
  const endPage = startPage + pageCount;
  const pageData = conversation.slice(startPage, endPage);

  function onNextPage(page: number) {
    setCurrentPage(page);
  }
  return (
    <div className="relative flex h-screen flex-[3_1_0] flex-col items-center justify-start overflow-hidden overflow-x-hidden bg-gradient-to-br from-slate-700 to-black py-20">
      <div className="flex w-full max-w-[70rem] flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-300">이전 기록들</h1>
        </div>
        <hr className="border-4" />
        <Table>
          <TableCaption>Code-Sync</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] font-bold text-white">
                제목
              </TableHead>
              <TableHead className="font-bold text-white">진행시간</TableHead>
              <TableHead className="font-bold text-white">
                기록된 날짜
              </TableHead>
              <TableHead className="font-bold text-white">기록 보기</TableHead>
              <TableHead className="font-bold text-white">공개 여부</TableHead>
              <TableHead className="font-bold text-white">PR 리뷰자</TableHead>
              <TableHead className="font-bold text-white"></TableHead>
              <TableHead className="font-bold text-white"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData?.map((conversation: Conversation, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-white">
                  {conversation.title}
                </TableCell>
                <TableCell className="text-white">
                  {new Date(conversation.startedAt).toLocaleString("ko-KR")}
                </TableCell>
                <TableCell className="text-white">3일 전</TableCell>
                <TableCell className="text-white">
                  {conversation.participant.email}
                </TableCell>
                <TableCell className="text-white">O</TableCell>
                <TableCell className="text-white">
                  {conversation.creator.name}
                </TableCell>
                <TableCell className="text-right text-white">
                  <Button className="bg-red-700 px-2 py-1 text-xs hover:bg-red-400">
                    삭제하기
                  </Button>
                </TableCell>
                <TableCell className="text-white">
                  <Button className="flex justify-start bg-gray-500 px-2 py-1 text-xs">
                    수정하기
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex justify-end text-white">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => onNextPage(Math.max(1, currentPage - 1))}
              />
            </PaginationItem>
            {Array.from({ length: totalPage }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink href="#" onClick={() => onNextPage(index + 1)}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => onNextPage(Math.min(pageCount, currentPage + 1))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
