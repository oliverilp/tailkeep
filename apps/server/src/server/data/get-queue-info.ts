import 'server-only';

import { downloadQueue, metadataQueue } from '@/lib/bullmq';
import { QueueInfo } from '@/schemas/queue-info';

export async function getQueueInfo(): Promise<QueueInfo> {
  const metadataJobsCount = await metadataQueue.getJobCountByTypes(
    'active',
    'wait',
    'waiting',
    'waiting-children',
    'delayed',
    'paused',
    'prioritized'
  );

  const downloadJobs = await downloadQueue.getJobCounts();
  const downloadQueueCount =
    downloadJobs.waiting + downloadJobs.delayed + downloadJobs.paused;

  if (metadataJobsCount > 1) {
    console.log('metadataJobsCount', metadataJobsCount);
  }

  return {
    queue: metadataJobsCount + downloadQueueCount,
    active: downloadJobs.active,
    finished: downloadJobs.completed,
    failed: downloadJobs.failed
  };
}
