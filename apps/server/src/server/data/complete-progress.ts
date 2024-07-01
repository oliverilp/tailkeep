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
        active: false,
        speed: '0B/s',
        eta: '00:00'
      }
    });

    return 'success';
  } catch (error) {
    return 'fail';
  } finally {
    // revalidatePath('/');
  }
}
