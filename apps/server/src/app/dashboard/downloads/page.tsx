'use client';

import React from 'react';
import type { DownloadProgressDto } from '@/schemas/progress';
import AddVideo from '@/app/dashboard/downloads/add-video';
import DownloadsTableLayout from '@/app/dashboard/downloads/table/table-layout';
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
