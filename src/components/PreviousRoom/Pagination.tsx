import { Data } from "@/apis/conversation/dtos";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "react-router-dom";
const PAGE_COUNT = 8;

const PreviousRoomsPagination = ({ data }: { data: Data }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const total = data.total;
  const paginationCount = Math.ceil(total / PAGE_COUNT);

  function onNextPage(page: number) {
    setSearchParams({ page: page.toString() });
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onNextPage(Math.max(1, currentPage - 1))}
          />
        </PaginationItem>
        {Array.from({ length: paginationCount }, (_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              onClick={(e) => {
                e.preventDefault();
                onNextPage(index + 1);
              }}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              onNextPage(Math.min(paginationCount, currentPage + 1))
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PreviousRoomsPagination;
