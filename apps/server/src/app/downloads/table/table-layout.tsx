import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DownloadProgressDto } from '@/schemas/progress';
import DownloadsTable from './table';

interface DownloadTabProps {
  items: DownloadProgressDto[];
  max: number;
}

interface DownloadsTableLayoutProps {
  items: DownloadProgressDto[];
}

type Tab = 'all' | 'active' | 'done';

function DownloadsTab({ items, max }: DownloadTabProps) {
  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Downloads</CardTitle>
        <CardDescription>
          Manage your YouTube video download history.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DownloadsTable items={items} />
      </CardContent>
      <CardFooter>
        <div className="text-muted-foreground text-xs">
          Showing <strong>{items.length}</strong> of <strong>{max}</strong>{' '}
          downloads
        </div>
      </CardFooter>
    </Card>
  );
}

function DownloadsTableLayout({ items }: DownloadsTableLayoutProps) {
  const tabs: Tab[] = ['all', 'active', 'done'];

  function filteredItems(tab: string): DownloadProgressDto[] {
    return items.filter((item) => {
      if (tab === 'all') {
        return true;
      }
      return tab === 'active'
        ? item.completedAt === null
        : item.completedAt !== null;
    });
  }

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="done">Done</TabsTrigger>
        </TabsList>
      </div>
      {tabs.map((tab) => (
        <TabsContent value={tab} key={tab}>
          <DownloadsTab items={filteredItems(tab)} max={items.length} />
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default DownloadsTableLayout;
