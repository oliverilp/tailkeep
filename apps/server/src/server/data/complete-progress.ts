import 'server-only';

import prisma from '@/lib/prisma';
import type { DownloadProgress } from '@/schemas/progress';

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

    return 'success';
  } catch (error) {
    return 'fail';
  } finally {
    // revalidatePath('/');
  }
}
