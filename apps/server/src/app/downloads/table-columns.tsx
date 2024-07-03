import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { ArrowUpDown, Delete, Link, MoreHorizontal } from 'lucide-react';
import { DownloadProgressDto } from '@/schemas/progress';
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

export const columns: ColumnDef<DownloadProgressDto>[] = [
  {
    id: 'image',
    header: '',
    cell: ({ row }) => {
      const thumbnailUrl: string = row.original.video.thumbnailUrl;

      return (
        <Image
          alt="Product image"
          className="aspect-video max-w-24 rounded-md object-cover"
          height="1280"
          width="720"
          src={thumbnailUrl}
        />
      );
    }
  },
  {
    accessorKey: 'video.title',
    header: 'title'
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    //     >
    //       Title
    //       <ArrowUpDown className="ml-2 h-4 w-4" />
    //     </Button>
    //   );
    // }
  },
  {
    id: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      const formatted = status === null ? '' : status?.toLowerCase();

      return <Badge variant="outline">{formatted}</Badge>;
    }
  },
  {
    id: 'progress',
    header: 'Progress',
    cell: ({ row }) => {
      const progress = row.original.progress;

      return `${progress}%`;
    }
  },
  {
    accessorKey: 'speed',
    header: 'Speed'
  },
  {
    accessorKey: 'eta',
    header: 'ETA'
  },
  {
    accessorKey: 'size',
    header: 'Size'
  },
  {
    id: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Started at
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      const date = new Date(createdAt);

      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      };
      const locale = navigator.language ?? 'en-GB';

      const datePart = date.toLocaleDateString(locale, options);
      const timePart = date.toLocaleTimeString(locale);

      return `${datePart} ${timePart}`;
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const url = row.original.video.url;

      return (
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
              onClick={() => navigator.clipboard.writeText(url)}
            >
              <Link className="mr-2 h-4 w-4" />
              <span>Copy YouTube URL</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
            // onClick={() => setOpen(true)}
            >
              <Delete className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
