'use client';

import React from 'react';
import { ArrowDownUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/ui/data-table';

import type { DownloadProgressDto } from '@/schemas/progress';
import { deleteDownloadAction } from '@/server/actions/delete-download';
import { columns } from '@/app/downloads/table-columns';

interface DownloadsTableProps {
  items: DownloadProgressDto[];
}

interface DeleteDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  item: DownloadProgressDto;
}

function DeleteDialog({ open, setOpen, item }: DeleteDialogProps) {
  const handleDelete = () => {
    console.log('Deleting item', item.video.title);
    void deleteDownloadAction({ id: item.id });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete download
            progress for video "{item.video.title}".
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant={'destructive'} onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function DownloadsTable({ items }: DownloadsTableProps) {
  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="done">Done</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ArrowDownUp className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Sort
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem>Name</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Status</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Progress</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Size</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Date</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <TabsContent value="all">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Downloads</CardTitle>
            <CardDescription>
              Manage your YouTube video download history.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={items} />
          </CardContent>
          <CardFooter>
            <div className="text-muted-foreground text-xs">
              Showing <strong>1-{items.length}</strong> of{' '}
              <strong>{items.length}</strong> downloads
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default DownloadsTable;
