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
  const { url } = job.data;

  const onProgressCallback = (progress: DownloadProgress) => {
    void job.updateProgress(progress);
  };
  throttledProgress$.subscribe(onProgressCallback);

  const downloader = new Downloader();

  await downloader.download(url, (progress: DownloadProgress) => {
    console.log('new update', new Date());
    subject.next(progress);
  });

  console.log('');
  console.log('Job "download" finished.');
}

async function processMetadata(job: Job) {
  const { url } = job.data;

  const metadataFetcher = new MetadataFetcher();
  const metadata = await metadataFetcher.fetch(url);

  void job.updateProgress(metadata);

  console.log('');
  console.log('Job "metadata" finished.');
}

const downloadWorker = new Worker('download-queue', processDownload, {
  connection
});

const metadataWorker = new Worker('metadata-queue', processMetadata, {
  connection
});
