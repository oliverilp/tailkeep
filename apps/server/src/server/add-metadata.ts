import prisma from '@/lib/prisma';
import { MetadataType } from '@/schemas/metadata';
import { downloadQueue } from '@/lib/bullmq';

export async function addVideo(metadata: MetadataType): Promise<string> {
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
