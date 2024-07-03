'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import type { DownloadProgressDto } from '@/schemas/progress';
import DownloadsTableRow from './table-row';

interface DownloadsTableProps {
  items: DownloadProgressDto[];
}

function DownloadsTable({ items }: DownloadsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="hidden lg:table-cell">Status</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead className="hidden md:table-cell">Speed</TableHead>
          <TableHead className="hidden md:table-cell">ETA</TableHead>
          <TableHead className="hidden md:table-cell">Size</TableHead>
          <TableHead className="hidden xl:table-cell">Started at</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length ? (
          <>
            {items.map((item) => (
              <DownloadsTableRow item={item} key={item.id} />
            ))}
          </>
        ) : (
          <TableRow>
            <TableCell colSpan={9} className="h-24 text-center">
              No downloads.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default DownloadsTable;
