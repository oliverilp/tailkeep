import { Worker, Job } from 'bullmq';
import { DownloadProgress, Downloader } from './downloader';

async function processJob(job: Job) {
  let previous = '';

  const onProgressCallback = (progress: DownloadProgress) => {
    const current = JSON.stringify(progress);
    if (previous === current) {
      return;
    }

    previous = current;
    void job.updateProgress(progress);
  };

  const downloader = new Downloader();
  const url = 'https://youtu.be/Ibjm2KHfymo';
  await downloader.download(url, onProgressCallback);

  console.log('');
  console.log('Job finished.');
}

const myWorker = new Worker('myqueue', processJob, {
  connection: {
    host: 'localhost',
    port: 6379
  }
});

console.log('worker obj', myWorker.id);

// const downloader = new Downloader();
// const url = 'https://youtu.be/Ibjm2KHfymo';
// downloader.download(url);
