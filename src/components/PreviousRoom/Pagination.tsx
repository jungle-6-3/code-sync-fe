import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePreviousRoomsQuery } from "@/hooks/Conversation/usePreviousRoomQuery";
import { useSearchParams } from "react-router-dom";

const PAGE_COUNT = 8;
const PAGE_GROUP_COUNT = 5;

const PreviousRoomsPagination = () => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const { previousRoom, isLoading } = usePreviousRoomsQuery(currentPage);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  const paginationCount = Math.ceil(
    (previousRoom?.data.total ?? 0) / PAGE_COUNT,
  );

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            to={`/room?${new URLSearchParams({
              page: Math.max(1, currentPage - 1).toString(),
            })}`}
          />
        </PaginationItem>
        {Array.from({ length: paginationCount }, (_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              to={`/room?${new URLSearchParams({
                page: (index + 1).toString(),
              })}`}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {paginationCount > PAGE_GROUP_COUNT ? <PaginationEllipsis /> : null}
        <PaginationItem>
          <PaginationNext
            to={`/room?${new URLSearchParams({
              page: Math.min(paginationCount, currentPage + 1).toString(),
            })}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PreviousRoomsPagination;
