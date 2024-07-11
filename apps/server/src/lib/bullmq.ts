import EventEmitter from 'node:events';
import { Queue, QueueEvents, type ConnectionOptions, Job } from 'bullmq';
import { addVideo } from '@/server/data/add-video';
import { addDownload } from '@/server/data/add-download';
import { completeDownload } from '@/server/data/complete-download';
import { videoSchema } from '@/schemas/video';
import {
  type DownloadProgressDto,
  downloadProgressSchema
} from '@/schemas/progress';
import { getDownloads } from '@/server/data/get-downloads';

const connection: ConnectionOptions = {
  host: process.env.REDIS_URL ?? 'localhost',
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379
};

export const metadataQueue = new Queue('metadata-queue', { connection });
export const downloadQueue = new Queue('download-queue', { connection });
export const progressEmitter = new EventEmitter();

const downloadEvents = new QueueEvents('download-queue', { connection });
downloadEvents.on('progress', async ({ data }) => {
  const progress = downloadProgressSchema.parse(data);
  await addDownload(progress);

  const downloads = await getDownloads();
  progressEmitter.emit<DownloadProgressDto[]>('update', downloads);
});

downloadEvents.on('completed', async ({ jobId }) => {
  const job = await Job.fromId(downloadQueue, jobId);
  if (!job) {
    return;
  }

  const progress = downloadProgressSchema.parse(job.returnvalue);
  await completeDownload(progress);

  const downloads = await getDownloads();
  progressEmitter.emit<DownloadProgressDto[]>('update', downloads);
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
