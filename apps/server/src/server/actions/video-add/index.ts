'use server';

// import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { downloadQueue } from '@/lib/bullmq';
import type { InputType, ReturnType } from './types';
import { VideoAdd } from './schema';

async function handler(data: InputType): Promise<ReturnType> {
  const { url } = data;

  console.log('video add handler');
  try {
    await downloadQueue.add('myJobName', { foo: url });
    console.log(downloadQueue.count());
    console.log('added to queue');

    return { success: true, data: null };
  } catch (error) {
    return { success: false, error: 'Failed to add video.' };
  } finally {
    // revalidatePath('/');
  }
}

export const videoAdd = createSafeAction(VideoAdd, handler);
