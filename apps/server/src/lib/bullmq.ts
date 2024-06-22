import { Queue, QueueEvents, type ConnectionOptions } from 'bullmq';
import { z } from 'zod';

const connection: ConnectionOptions = {
  host: 'redis',
  port: 6379
};

// Create a new connection in every instance
export const myQueue = new Queue('myqueue', { connection });

const queueEvents = new QueueEvents('myqueue', { connection });

export const DownloadProgress = z.object({
  status: z.string().nullable(),
  progress: z.string().nullable()
});

export type DownloadProgressType = z.infer<typeof DownloadProgress>;

export interface FakeDB {
  download: DownloadProgressType;
}

export const fakeDB: FakeDB = {
  download: {
    status: null,
    progress: null
  }
};

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
    fakeDB.download = download;

    console.log(fakeDB);
  }
);
