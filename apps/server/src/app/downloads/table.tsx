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
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { DownloadProgressDto } from '@/schemas/progress';
import DownloadsTableRow from './table-row';

interface DownloadsTableProps {
  items: DownloadProgressDto[];
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
                  <TableHead className="hidden xl:table-cell">
                    Started at
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <DownloadsTableRow item={item} key={item.id} />
                ))}
              </TableBody>
            </Table>
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
