'use client';

import React from 'react';
import AddVideo from '@/app/dashboard/download/add-video';
import DownloadsTableLayout from '@/app/dashboard/download/table/table-layout';
import { useServerEvents } from '@/lib/use-server-events';
import DownloadsInfo from './downloads-info';
import type { DownloadsDashboard } from '@/schemas/downloads-dashboard';

interface DownloadsProps {
  dashboardData: DownloadsDashboard;
}

function Downloads({ dashboardData }: DownloadsProps) {
  const { queueInfo, downloads } = useServerEvents(dashboardData);

  return (
    <>
      <AddVideo />
      <DownloadsInfo queueInfo={queueInfo} />
      <DownloadsTableLayout items={downloads} />
    </>
  );
}

export default Downloads;
