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

export default function PreviousMeeting() {
  return (
    <div className="h-screenflex-[3_1_0] relative flex h-screen flex-col items-center justify-start overflow-hidden overflow-x-hidden bg-gradient-to-br from-slate-700 to-black py-20">
      <div className="flex w-full max-w-[70rem] flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-300">이전 기록들</h1>
        </div>
        <hr className="border-4" />
        <table className="table-auto border-l-0 border-r-0">
          <thead>
            <tr className="text-left text-sm text-white">
              <th>제목</th>
              <th>진행시간</th>
              <th>기록된 날짜</th>
              <th>기록 보기</th>
              <th>공개 여부</th>
              <th>PR 리뷰자</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-gray border-2 border-l-0 border-r-0 text-center text-white">
              <td>채승과의 대화</td>
              <td>30분</td>
              <td>3일전</td>
              <td>http://3.kr/s/123123</td>
              <td>O</td>
              <td>윤민성</td>
              <td className="flex w-[300px] justify-end">
                <Button className="bg-red-700 px-2 py-1 text-xs hover:bg-red-400">
                  삭제하기
                </Button>
              </td>
              <td>
                <Button className="flex justify-start bg-gray-500 px-2 py-1 text-xs">
                  수정하기
                </Button>
              </td>
            </tr>
            <tr className="border-gray border-2 border-l-0 border-r-0 text-center text-white">
              <td>채승과의 대화</td>
              <td>30분</td>
              <td>3일전</td>
              <td>http://3.kr/s/123123</td>
              <td>O</td>
              <td>윤민성</td>
              <td className="flex w-[300px] justify-end">
                <Button className="bg-red-700 px-2 py-1 text-xs hover:bg-red-400">
                  삭제하기
                </Button>
              </td>
              <td>
                <Button className="flex justify-start bg-gray-500 px-2 py-1 text-xs">
                  수정하기
                </Button>
              </td>
            </tr>
            <tr className="border-gray border-2 border-l-0 border-r-0 text-center text-white">
              <td>채승과의 대화</td>
              <td>30분</td>
              <td>3일전</td>
              <td>http://3.kr/s/123123</td>
              <td>O</td>
              <td>윤민성</td>
              <td className="flex w-[300px] justify-end">
                <Button className="bg-red-700 px-2 py-1 text-xs hover:bg-red-400">
                  삭제하기
                </Button>
              </td>
              <td>
                <Button className="flex justify-start bg-gray-500 px-2 py-1 text-xs">
                  수정하기
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end text-white">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
