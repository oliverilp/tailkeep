import { Queue, Worker } from 'bullmq';

// Create a new connection in every instance
export const myQueue = new Queue('myqueue', {
  connection: {
    host: 'redis',
    port: 6379
  }
});

export const myWorker = new Worker(
  'myqueue',
  async () => {
    console.log('worker');
  },
  {
    connection: {
      host: 'redis',
      port: 6379
    }
  }
);
