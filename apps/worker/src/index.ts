import 'dotenv/config';
import { Worker, Job, type ConnectionOptions } from 'bullmq';
import { Subject, merge } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { DownloadProgress, Downloader } from './downloader';
import { MetadataFetcher } from './metadata-fetcher';

const connection: ConnectionOptions = {
  host: process.env.REDIS_URL ?? 'localhost',
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379
};

const subject = new Subject<DownloadProgress>();
const throttled$ = subject.pipe(throttleTime(500));

async function processDownload(job: Job): Promise<DownloadProgress | void> {
  const { videoId, url } = job.data;
  if (job.id === undefined) {
    console.error('Missing job id.');
    return;
  }
  const id = parseInt(job.id);

  const onProgressCallback = (progress: DownloadProgress) => {
    void job.updateProgress(progress);
    console.log(progress.progress, new Date());
  };

  throttled$.subscribe(onProgressCallback);

  const downloader = new Downloader(videoId, id, url);

  const output = await downloader.download((progress: DownloadProgress) => {
    subject.next(progress);
  });

  console.log('');
  console.log('Job "download" finished.');
  return output;
}

async function processMetadata(job: Job) {
  const { url } = job.data;

  console.log('metadata got url', url);

  const metadataFetcher = new MetadataFetcher(url);
  const metadata = await metadataFetcher.fetch();

  console.log('');
  console.log('Job "metadata" finished.');

  return { metadata: metadata };
}

const downloadWorker = new Worker('download-queue', processDownload, {
  connection
});

const metadataWorker = new Worker('metadata-queue', processMetadata, {
  connection
});
