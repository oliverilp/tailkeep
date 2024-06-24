import { Metadata } from '@/server/models/metadata';
import {
  DownloadProgress,
  DownloadProgressType
} from '@/server/models/progress';
import { Queue, QueueEvents, type ConnectionOptions } from 'bullmq';
import EventEmitter from 'events';

const connection: ConnectionOptions = {
  host: 'localhost',
  port: 6379
};

export const metadataQueue = new Queue('metadata-queue', { connection });
export const downloadQueue = new Queue('download-queue', { connection });
export const progressEmitter = new EventEmitter();

const downloadEvents = new QueueEvents('download-queue', { connection });
downloadEvents.on(
  'progress',
  ({ jobId, data }: { jobId: string; data: number | object }) => {
    const validationResult = DownloadProgress.safeParse(data);
    if (!validationResult.success) {
      return;
    }
    const download = validationResult.data;
    progressEmitter.emit<DownloadProgressType>('update', download);
  }
);

const metadataEvents = new QueueEvents('metadata-queue', { connection });
metadataEvents.on(
  'progress',
  ({ jobId, data }: { jobId: string; data: number | object }) => {
    const metadata = Metadata.parse(data);
    console.log('metadata update', metadata);
  }
);
