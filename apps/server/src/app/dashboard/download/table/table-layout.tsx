import React from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { capitalize } from '@/lib/utils';
import { DownloadProgressDto } from '@/schemas/progress';
import DownloadsTable from './table';

interface DownloadTabProps {
  items: DownloadProgressDto[];
  max: number;
}

interface DownloadsTableLayoutProps {
  items: DownloadProgressDto[];
}

const tabSchema = z.union([
  z.literal('all'),
  z.literal('active'),
  z.literal('done')
]);
type Tab = z.infer<typeof tabSchema>;

const paramsSchema = z.object({
  progress: tabSchema.default('all')
});

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

  const searchParams = useSearchParams();
  const queryEntries = Object.fromEntries(searchParams.entries());

  const validationResult = paramsSchema.safeParse(queryEntries);
  const validatedParams = validationResult.success
    ? validationResult.data
    : { progress: 'all' };

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
    <Tabs defaultValue={validatedParams.progress}>
      <div className="mb-2 flex items-center">
        <TabsList>
          {tabs.map((tab) => (
            <Link
              href={`?progress=${tab}`}
              key={tab}
              className="cursor-pointer"
            >
              <TabsTrigger value={tab}>{capitalize(tab)}</TabsTrigger>
            </Link>
          ))}
        </TabsList>
      </div>
      <DownloadsTab
        items={filteredItems(validatedParams.progress)}
        max={items.length}
      />
    </Tabs>
  );
}

export default DownloadsTableLayout;
