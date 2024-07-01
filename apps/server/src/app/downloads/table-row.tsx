'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Delete, Link, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import type { DownloadProgressDto } from '@/schemas/progress';
import { deleteDownloadAction } from '@/server/actions/delete-download';

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  const datePart = date.toLocaleDateString('en-gb', options);
  const timePart = date.toLocaleTimeString('en-gb');

  return `${timePart} ${datePart}`;
}

function formatStatus(status: string | null): string {
  if (status === null) {
    return '';
  }
  return status.replace('[', '').replace(']', '').toLowerCase();
}

function DownloadsTableRow({ item }: { item: DownloadProgressDto }) {
  const handleDelete = async () => {
    console.log('Deleting item', item.video.title);
    await deleteDownloadAction({ id: item.id });
  };

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Product image"
          className="aspect-video rounded-md object-cover"
          height="1280"
          width="720"
          src={item.video.thumbnailUrl}
        />
      </TableCell>
      <TableCell className="font-medium">{item.video.title}</TableCell>
      <TableCell className="hidden lg:table-cell">
        <Badge variant="outline">{formatStatus(item.status)}</Badge>
      </TableCell>
      <TableCell>{item.progress}%</TableCell>
      <TableCell className="hidden md:table-cell">{item.speed}</TableCell>
      <TableCell className="hidden md:table-cell">{item.eta}</TableCell>
      <TableCell className="hidden md:table-cell">{item.size}</TableCell>
      <TableCell className="hidden xl:table-cell">
        {formatDate(new Date(item.createdAt))}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(item.video.url)}
            >
              <Link className="mr-2 h-4 w-4" />
              <span>Copy YouTube URL</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDelete}>
              <Delete className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

export default DownloadsTableRow;
