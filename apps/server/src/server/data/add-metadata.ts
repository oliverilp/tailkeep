import 'server-only';

import prisma from '@/lib/prisma';
import { Video } from '@/schemas/video';
import { downloadQueue } from '@/lib/bullmq';

export async function addVideo(metadata: Video): Promise<string> {
  try {
    const video = await prisma.video.create({
      data: metadata
    });

    await downloadQueue.add('download', { videoId: video.id, url: video.url });

    return 'success';
  } catch (error) {
    return 'fail';
  } finally {
    // revalidatePath('/');
  }
}
