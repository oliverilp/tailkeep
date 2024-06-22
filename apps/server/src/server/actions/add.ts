'use server';

// import { revalidatePath } from 'next/cache';
import { myQueue } from '@/lib/bullmq';

// function delay(time: number) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, time);
//   });
// }

export async function addToQueue(url: string): Promise<string> {
  console.log('video add handler');
  try {
    await myQueue.add('myJobName', { foo: url });

    // await delay(500);
    console.log('added to queue');
    console.log(
      'info',
      await myQueue.getJobCounts(
        'wait',
        'delayed',
        'waiting',
        'active',
        'completed'
      )
    );

    return 'success';
  } catch (error) {
    return 'fail';
  } finally {
    // revalidatePath('/');
  }
}
