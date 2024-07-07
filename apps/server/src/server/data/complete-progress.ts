import 'server-only';

import prisma from '@/lib/prisma';
import type { DownloadProgress } from '@/schemas/progress';
import { revalidatePath } from 'next/cache';

export async function completeProgress(
  progress: DownloadProgress
): Promise<string> {
  try {
    await prisma.videoProgress.update({
      where: {
        jobId: progress.jobId
      },
      data: {
        ...progress,
        status: 'done',
        speed: '0B/s',
        eta: '00:00',
        completedAt: new Date()
      }
    });

    revalidatePath('/dashboard');
    return 'success';
  } catch (error) {
    return 'fail';
  } finally {
    // revalidatePath('/');
  }
}
