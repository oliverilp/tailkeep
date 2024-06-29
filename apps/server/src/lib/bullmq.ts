import EventEmitter from 'node:events';
import { Queue, QueueEvents, type ConnectionOptions, Job } from 'bullmq';
import { z } from 'zod';
import { addVideo } from '@/server/data/add-metadata';
import { addProgress } from '@/server/data/add-progress';
import { completeProgress } from '@/server/data/complete-progress';
import { videoSchema } from '@/schemas/video';
import {
  type DownloadProgressDto,
  downloadProgressSchema
} from '@/schemas/progress';
import { getProgresses } from '@/server/data/get-progresses';

const connection: ConnectionOptions = {
  host: 'localhost',
  port: 6379
};

export const metadataQueue = new Queue('metadata-queue', { connection });
export const downloadQueue = new Queue('download-queue', { connection });
export const progressEmitter = new EventEmitter();

const downloadEvents = new QueueEvents('download-queue', { connection });
downloadEvents.on('progress', async ({ data }) => {
  const progress = downloadProgressSchema.parse(data);
  await addProgress(progress);

  const progressList = await getProgresses();

  progressEmitter.emit<DownloadProgressDto[]>('update', progressList);
});

downloadEvents.on('completed', async ({ jobId }) => {
  const job = await Job.fromId(downloadQueue, jobId);
  if (!job) {
    return;
  }

  const videoId = z.number().parse(job.returnvalue?.jobId);
  void completeProgress(videoId);
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
