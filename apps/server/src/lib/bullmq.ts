import EventEmitter from 'node:events';
import { Queue, QueueEvents, type ConnectionOptions, Job } from 'bullmq';
import { addVideo } from '@/server/data/add-video';
import { addDownload } from '@/server/data/add-download';
import { completeDownload } from '@/server/data/complete-download';
import { videoSchema } from '@/schemas/video';
import { downloadProgressSchema } from '@/schemas/progress';
import { getDownloads } from '@/server/data/get-downloads';
import { getQueueInfo } from '@/server/data/get-queue-info';
import type { DownloadsDashboard } from '@/schemas/downloads-dashboard';

const connection: ConnectionOptions = {
  host: process.env.REDIS_URL ?? 'localhost',
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379
};

export const metadataQueue = new Queue('metadata-queue', { connection });
export const downloadQueue = new Queue('download-queue', { connection });
export const progressEmitter = new EventEmitter();

export async function emitDashboardUpdates() {
  const [downloads, queueInfo] = await Promise.all([
    await getDownloads(),
    await getQueueInfo()
  ]);

  progressEmitter.emit<DownloadsDashboard>('update', { queueInfo, downloads });
}

const downloadEvents = new QueueEvents('download-queue', { connection });
downloadEvents.on('progress', async ({ data }) => {
  const progress = downloadProgressSchema.parse(data);
  await addDownload(progress);

  emitDashboardUpdates();
});

downloadEvents.on('completed', async ({ jobId }) => {
  const job = await Job.fromId(downloadQueue, jobId);
  if (!job) {
    return;
  }

  const progress = downloadProgressSchema.parse(job.returnvalue);
  await completeDownload(progress);

  emitDashboardUpdates();
});

const metadataEvents = new QueueEvents('metadata-queue', { connection });
metadataEvents.on('completed', async ({ jobId }) => {
  const job = await Job.fromId(metadataQueue, jobId);
  if (!job) {
    return;
  }

  const metadata = videoSchema.parse(job.returnvalue?.metadata);
  void addVideo(metadata);
});
