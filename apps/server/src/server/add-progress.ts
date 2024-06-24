'use server';

import prisma from '@/lib/prisma';
import { DownloadProgressType } from './models/progress';

export async function addProgress(
  progress: DownloadProgressType
): Promise<string> {
  try {
    await prisma.videoProgress.upsert({
      where: {
        videoId: progress.videoId
      },
      update: progress,
      create: progress
    });

    return 'success';
  } catch (error) {
    return 'fail';
  } finally {
    // revalidatePath('/');
  }
}
