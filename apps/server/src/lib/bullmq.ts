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

// Create a new connection in every instance
export const myQueue = new Queue('myqueue', { connection });
export const progressEmitter = new EventEmitter();

const queueEvents = new QueueEvents('myqueue', { connection });

queueEvents.on(
  'progress',
  ({ jobId, data }: { jobId: string; data: number | object }) => {
    // jobId received a progress event
    // console.log('job progress:', data);
    const validationResult = DownloadProgress.safeParse(data);
    if (!validationResult.success) {
      return;
    }
    const download = validationResult.data;
    progressEmitter.emit<DownloadProgressType>('update', download);
  }
);
