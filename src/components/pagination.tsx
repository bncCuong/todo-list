import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationProps {
  pageSize: number | 1;
  totalPage: number;
  hasNextPage: boolean;
  currentPage: number;
}

const PaginationPage = ({ hasNextPage, pageSize, totalPage, currentPage }: PaginationProps) => {
  const pageNumber = currentPage | 1;
  const skip = (pageNumber - 1) * pageSize;
  const _currentPage = Math.min(Math.max(Number(pageSize), 1), totalPage);
  console.log(currentPage);

  const nextPage = () => {
    if (hasNextPage) {
      currentPage + 1;
    }
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={`?page=${currentPage - 1}`} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href={`?page=1`}>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href={`?page=${currentPage + 1}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationPage;
