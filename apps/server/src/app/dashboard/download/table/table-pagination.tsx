import React from 'react';
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
  searchParams: {
    progress: string;
    page: number;
  };
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

function TablePagination({ total, limit, searchParams }: TablePaginationProps) {
  const { page, progress } = searchParams;
  const pageCount = Math.ceil(total / limit);
  const pages = getPages(pageCount, page);

  return (
    <div>
      <Pagination>
        <PaginationContent className="w-full justify-between sm:w-fit lg:items-center lg:justify-normal">
          <PaginationItem>
            <PaginationPrevious
              disabled={page === 1}
              href={`?progress=${progress}&page=${page - 1}`}
            />
          </PaginationItem>

          <div className="sm:hidden">{`Page: ${page}/${pageCount}`}</div>

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
                    href={`?progress=${progress}&page=${item}`}
                    isActive={item === page}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              );
            }
          })}
          <PaginationItem>
            <PaginationNext
              disabled={page === pageCount}
              href={`?progress=${progress}&page=${page + 1}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default TablePagination;
