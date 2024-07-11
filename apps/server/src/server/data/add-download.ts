import 'server-only';

import prisma from '@/lib/prisma';
import { DownloadProgress } from '@/schemas/progress';

export async function addDownload(progress: DownloadProgress): Promise<string> {
  try {
    await prisma.videoProgress.upsert({
      where: {
        jobId: progress.jobId
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
