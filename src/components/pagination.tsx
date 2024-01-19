'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface PaginationProps {
  pageSize: number | 1;
  totalPage: number;
  currentPage: number;
}

const PaginationPage = ({ totalPage, currentPage }: PaginationProps) => {
  const [showPage, setShowPage] = useState<boolean>(false)
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalNumber = [];
  for (let i = 1; i <= totalPage; i++) {
    totalNumber.push(i);
  }

  const createPageURL = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPage) {
      return;
    }
    if (pageNumber > 3) setShowPage(false)
    if(currentPage + 2 > pageNumber) setShowPage(false)
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    if(pageNumber == 0) params.delete("page")
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem onClick={() => createPageURL(Number(currentPage) - 1)} key={Math.random() * 10}>
          <PaginationPrevious />
        </PaginationItem>
        {currentPage > 4 && !showPage &&  totalPage > 5 && (
          <PaginationItem key={Math.random() * 10} onClick={() => setShowPage(true)}>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {totalNumber.map((item, index) => {
          return (
            <PaginationItem
              hidden={(Number(currentPage) - item > 3 && !showPage && totalPage > 5) || (Number(currentPage) +3 < item && !showPage&& totalPage > 5) }
              key={Math.random() * index}
              onClick={() => createPageURL(item)}
            >
              <PaginationLink isActive={currentPage == item}>{item}</PaginationLink>
            </PaginationItem>
          );
        })}
        {totalPage - currentPage > 3 && !showPage && totalPage > 5 && (
          <PaginationItem key={Math.random() * 10}  onClick={() => setShowPage(true)}>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem onClick={() => createPageURL(Number(currentPage) + 1)} key={Math.random() * 10}>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationPage;
