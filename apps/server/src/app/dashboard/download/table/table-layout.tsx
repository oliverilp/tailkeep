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
import TablePagination from './table-pagination';

const tabSchema = z.union([
  z.literal('all'),
  z.literal('active'),
  z.literal('done')
]);
type Tab = z.infer<typeof tabSchema>;

const paramsSchema = z.object({
  progress: tabSchema.default('all'),
  page: z.coerce.number().positive().int().default(1)
});
type SearchParams = z.infer<typeof paramsSchema>;

interface DownloadTabProps {
  items: DownloadProgressDto[];
  max: number;
  limit: number;
  searchParams: SearchParams;
}

interface DownloadsTableLayoutProps {
  items: DownloadProgressDto[];
}

function DownloadsTab({ items, max, limit, searchParams }: DownloadTabProps) {
  const start = limit * (searchParams.page - 1) + 1;
  const end = Math.min(limit * searchParams.page, max);

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
      <CardFooter className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
        <div className="w-full sm:w-fit">
          {max > limit && (
            <TablePagination
              total={max}
              limit={limit}
              searchParams={searchParams}
            />
          )}
        </div>
        <div className="text-muted-foreground   text-xs">
          Showing{' '}
          <strong>
            {start}-{end}
          </strong>{' '}
          of <strong>{max}</strong> downloads
        </div>
      </CardFooter>
    </Card>
  );
}

function DownloadsTableLayout({ items }: DownloadsTableLayoutProps) {
  const tabs: Tab[] = ['all', 'active', 'done'];
  const limit = 5;

  const searchParams = useSearchParams();
  const queryEntries = Object.fromEntries(searchParams.entries());

  const validationResult = paramsSchema.safeParse(queryEntries);
  const { progress, page }: SearchParams = validationResult.success
    ? validationResult.data
    : { progress: 'all', page: 1 };

  const offset = (page - 1) * limit;
  const filteredByTabItems = items.filter((item) => {
    if (progress === 'all') {
      return true;
    }
    return progress === 'active'
      ? item.completedAt === null
      : item.completedAt !== null;
  });
  const filteredByPaginationItems = filteredByTabItems.filter(
    (_, index) => offset <= index && index < offset + limit
  );

  return (
    <Tabs defaultValue={progress}>
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
        items={filteredByPaginationItems}
        max={filteredByTabItems.length}
        limit={limit}
        searchParams={{ progress, page }}
      />
    </Tabs>
  );
}

export default DownloadsTableLayout;
