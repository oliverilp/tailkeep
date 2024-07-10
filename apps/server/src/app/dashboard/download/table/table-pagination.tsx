import React, { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';

interface TablePaginationProps {
  total: number;
  limit: number;
  page: number;
}

type Page = number | string;

function getPages(pageCount: number, page: number): Page[] {
  const pages: Page[] = [];
  const ellipsis = '...';
  const totalPaginationElements = 8;
  const maxVisiblePages = 5;
  const isNearStart = page <= 4;
  const isNearEnd = page >= pageCount - 3;

  if (pageCount <= totalPaginationElements) {
    for (let i = 1; i <= pageCount; i++) {
      pages.push(i);
    }
  } else {
    if (isNearStart) {
      for (let i = 1; i <= 6; i++) {
        pages.push(i);
      }
      pages.push(ellipsis);
      pages.push(pageCount);
    } else if (isNearEnd) {
      pages.push(1);
      pages.push(ellipsis);
      for (let i = pageCount - maxVisiblePages; i <= pageCount; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push(ellipsis);
      for (let i = page - 1; i <= page + 2; i++) {
        pages.push(i);
      }
      pages.push(ellipsis);
      pages.push(pageCount);
    }
  }

  return pages;
}

function TablePagination({ total, limit, page }: TablePaginationProps) {
  // const [currentPage, setCurrentPage] = useState(1);
  const currentPage = page;
  const pageCount = Math.ceil(total / limit);
  const pages = getPages(pageCount, currentPage);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= pageCount) {
      // setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <Pagination>
        <PaginationContent className="w-full justify-between sm:w-fit lg:items-center lg:justify-normal">
          <PaginationItem>
            <PaginationPrevious
              disabled={currentPage === 1}
              href={`?page=${currentPage - 1}`}
              // onClick={() => handlePageChange(currentPage - 1)}
            />
          </PaginationItem>

          <div className="sm:hidden">{`Page: ${currentPage}/${pageCount}`}</div>

          {pages.map((item, index) => {
            if (item === '...') {
              return (
                <PaginationItem
                  className="hidden sm:flex"
                  key={`ellipsis-${index}`}
                >
                  <PaginationEllipsis />
                </PaginationItem>
              );
            } else {
              return (
                <PaginationItem className="hidden sm:flex" key={item}>
                  <PaginationLink
                    href={`?page=${item}`}
                    isActive={item === currentPage}
                    // onClick={() => handlePageChange(item as number)}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              );
            }
          })}
          <PaginationItem>
            <PaginationNext
              disabled={currentPage === pageCount}
              href={`?page=${currentPage + 1}`}
              // onClick={() => handlePageChange(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default TablePagination;
