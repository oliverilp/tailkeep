import 'server-only';

import prisma from '@/lib/prisma';
import type { Video } from '@/schemas/video';
import { downloadQueue } from '@/lib/bullmq';

export async function addVideo(metadata: Video): Promise<string> {
  try {
    const video = await prisma.video.create({
      data: metadata
    });
    console.log('Downloading video:', video.title);

    await downloadQueue.add('download', { videoId: video.id, url: video.url });

    return 'success';
  } catch (error) {
    return 'fail';
  } finally {
    // revalidatePath('/');
  }
}
