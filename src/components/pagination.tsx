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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface PaginationProps {
  pageSize: number | 1;
  totalPage: number;
  currentPage: number;
}

const PaginationPage = ({ totalPage, currentPage, pageSize }: PaginationProps) => {
  const [showPage, setShowPage] = useState<boolean>(false);
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const totalNumber = [];
  for (let i = 1; i <= totalPage; i++) {
    totalNumber.push(i);
  }
  const hanldeSelectPage = (value: string) => {
    params.set('pagesize', value);
    if (value.toString() === pageSize.toString()) params.delete('pagesize');
    replace(`${pathname}?${params.toString()}`);
  };
  const createPageURL = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPage) {
      return;
    }
    if (pageNumber > 3) setShowPage(false);
    if (currentPage + 2 > pageNumber) setShowPage(false);
    params.set('page', pageNumber.toString());
    if (pageNumber == 0) params.delete('page');
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex">
      <Pagination>
        <PaginationContent>
          <PaginationItem onClick={() => createPageURL(Number(currentPage) - 1)} key={Math.random() * 10}>
            <PaginationPrevious />
          </PaginationItem>
          {currentPage > 4 && !showPage && totalPage > 5 && (
            <PaginationItem key={Math.random() * 10} onClick={() => setShowPage(true)}>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {totalNumber.map((item, index) => {
            return (
              <PaginationItem
                hidden={
                  (Number(currentPage) - item > 3 && !showPage && totalPage > 5) ||
                  (Number(currentPage) + 3 < item && !showPage && totalPage > 5)
                }
                key={Math.random() * index}
                onClick={() => createPageURL(item)}
              >
                <PaginationLink isActive={currentPage == item}>{item}</PaginationLink>
              </PaginationItem>
            );
          })}
          {totalPage - currentPage > 3 && !showPage && totalPage > 5 && (
            <PaginationItem key={Math.random() * 10} onClick={() => setShowPage(true)}>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem onClick={() => createPageURL(Number(currentPage) + 1)} key={Math.random() * 10}>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <Select onValueChange={hanldeSelectPage}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={`${pageSize} board/page`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel> Board / page</SelectLabel>
            <SelectItem value="4">4 board</SelectItem>
            <SelectItem value="8">8 board</SelectItem>
            <SelectItem value="12">12 board</SelectItem>
            <SelectItem value="16">16 board</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PaginationPage;
