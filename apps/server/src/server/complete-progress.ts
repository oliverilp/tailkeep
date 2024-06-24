'use server';

import prisma from '@/lib/prisma';

export async function completeProgress(videoId: number): Promise<string> {
  try {
    await prisma.videoProgress.update({
      where: {
        videoId
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
