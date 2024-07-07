'use client';

import React from 'react';
import type { DownloadProgressDto } from '@/schemas/progress';
import AddVideo from '@/app/dashboard/download/add-video';
import DownloadsTableLayout from '@/app/dashboard/download/table/table-layout';
import { useServerEvents } from '@/lib/use-server-events';

interface DownloadsProps {
  items: DownloadProgressDto[];
}

function Downloads({ items }: DownloadsProps) {
  const progressList = useServerEvents(items);

  return (
    <>
      <AddVideo />
      <DownloadsTableLayout items={progressList} />
    </>
  );
}

export default Downloads;
