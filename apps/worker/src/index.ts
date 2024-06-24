import { Worker, Job, type ConnectionOptions } from 'bullmq';
import { Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { DownloadProgress, Downloader } from './downloader';
import { Metadata, MetadataFetcher } from './metadata-fetcher';

const connection: ConnectionOptions = {
  host: 'localhost',
  port: 6379
};

const subject = new Subject<DownloadProgress>();

const throttledProgress$ = subject.pipe(throttleTime(500));

async function processDownload(job: Job) {
  const { videoId, url } = job.data;

  const onProgressCallback = (progress: DownloadProgress) => {
    console.log('new update', new Date(), progress);
    void job.updateProgress(progress);
  };
  throttledProgress$.subscribe(onProgressCallback);

  const downloader = new Downloader(videoId, url);

  await downloader.download((progress: DownloadProgress) => {
    subject.next(progress);
  });

  console.log('');
  console.log('Job "download" finished.');
  return { videoId };
}

async function processMetadata(job: Job) {
  const { url } = job.data;

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
