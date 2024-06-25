import prisma from '@/lib/prisma';
import { DownloadProgressType } from '@/schemas/progress';

export async function addProgress(
  progress: DownloadProgressType
): Promise<string> {
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
