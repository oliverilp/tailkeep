import { addVideo } from '@/server/add-metadata';
import { addProgress } from '@/server/add-progress';
import { completeProgress } from '@/server/complete-progress';
import { Metadata } from '@/schemas/metadata';
import { DownloadProgress, DownloadProgressType } from '@/schemas/progress';
import { Queue, QueueEvents, type ConnectionOptions, Job } from 'bullmq';
import EventEmitter from 'events';
import { z } from 'zod';

const connection: ConnectionOptions = {
  host: 'localhost',
  port: 6379
};

export const metadataQueue = new Queue('metadata-queue', { connection });
export const downloadQueue = new Queue('download-queue', { connection });
export const progressEmitter = new EventEmitter();

const downloadEvents = new QueueEvents('download-queue', { connection });
downloadEvents.on('progress', ({ data }) => {
  const progress = DownloadProgress.parse(data);
  progressEmitter.emit<DownloadProgressType>('update', progress);

  void addProgress(progress);
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

  const metadata = Metadata.parse(job.returnvalue?.metadata);
  void addVideo(metadata);
});
