'use server';

import { createSafeAction } from '@/lib/create-safe-action';
import { revalidatePath } from 'next/cache';
import { myQueue } from '@/lib/bullmq';
import { InputType, ReturnType } from './types';
import { VideoAdd } from './schema';

async function handler(data: InputType): Promise<ReturnType> {
  const { url } = data;

  try {
    await myQueue.add('myJobName', { foo: url });

    return { success: true, data: null };
  } catch (error) {
    return { success: false, error: 'Failed to add video.' };
  } finally {
    revalidatePath('/');
  }
}

export const videoAdd = createSafeAction(VideoAdd, handler);
