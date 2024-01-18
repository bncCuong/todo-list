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
import { useEffect, useState } from 'react';

interface PaginationProps {
  pageSize: number | 1;
  totalPage: number;
  currentPage: number;
}

const PaginationPage = ({ totalPage, currentPage }: PaginationProps) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalNumber = [];
  for (let i = 1; i <= totalPage; i++) {
    totalNumber.push(i);
  }

  const createPageURL = (pageNumber: number) => {
    console.log(pageNumber);
    console.log(totalPage);
    if (pageNumber < 1 || pageNumber > totalPage) {
      return;
    }
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem onClick={() => createPageURL(Number(currentPage) - 1)} key={Math.random() * 10}>
          <PaginationPrevious />
        </PaginationItem>
        {currentPage > 3 && (
          <PaginationItem key={Math.random() * 10}>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {totalNumber.map((item, index) => {
          return (
            <PaginationItem
              hidden={currentPage - item > 2}
              key={Math.random() * index}
              onClick={() => createPageURL(item)}
            >
              <PaginationLink isActive={currentPage == item}>{item}</PaginationLink>
            </PaginationItem>
          );
        })}
        {totalPage > 5 && (
          <PaginationItem key={Math.random() * 10}>
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
