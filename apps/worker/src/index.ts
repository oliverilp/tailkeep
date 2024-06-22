import { Worker, Job, QueueEvents } from 'bullmq';
import { DownloadProgress, Downloader } from './downloader';

function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

async function processJob(job: Job) {
  const onProgressCallback = (progress: DownloadProgress) => {
    void job.updateProgress(progress);
  };

  // console.log('worker job', job.data);
  // await delay(1000);

  const downloader = new Downloader();
  const url = 'https://youtu.be/Ibjm2KHfymo';
  await downloader.download(url, onProgressCallback);

  console.log('');
  console.log('Job finished.');
}

const myWorker = new Worker('myqueue', processJob, {
  connection: {
    host: 'redis',
    port: 6379
  }
});

console.log('worker obj', myWorker.id);

// const downloader = new Downloader();
// const url = 'https://youtu.be/Ibjm2KHfymo';
// downloader.download(url);
