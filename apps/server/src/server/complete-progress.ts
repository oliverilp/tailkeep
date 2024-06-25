import prisma from '@/lib/prisma';

export async function completeProgress(jobId: number): Promise<string> {
  try {
    await prisma.videoProgress.update({
      where: {
        jobId
      },
      data: {
        active: false,
        speed: '0B/s'
      }
    });

    return 'success';
  } catch (error) {
    return 'fail';
  } finally {
    // revalidatePath('/');
  }
}
