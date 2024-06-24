'use server';

import { metadataQueue } from '@/lib/bullmq';
import prisma from '@/lib/prisma';

export async function addToQueue(url: string): Promise<string> {
  console.log('video add handler');
  try {
    await metadataQueue.add('metadata', { url });

    // await delay(500);
    console.log('added to queue');
    console.log(
      'info',
      await metadataQueue.getJobCounts(
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
