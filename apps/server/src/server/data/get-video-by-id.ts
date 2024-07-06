import 'server-only';

import prisma from '@/lib/prisma';
import type { VideoByIdDto } from '@/schemas/video-by-id';

export async function getVideoById(id: string): Promise<VideoByIdDto | null> {
  const video = await prisma.video.findUnique({
    where: {
      id
    }
  });
  if (!video) {
    return null;
  }

  const [totalProgressCount, completedProgressCount] = await Promise.all([
    prisma.videoProgress.count({
      where: { videoId: video.id }
    }),
    prisma.videoProgress.count({
      where: {
        videoId: video.id,
        completedAt: { not: null }
      }
    })
  ]);
  const doneDownloading =
    totalProgressCount > 0 && totalProgressCount === completedProgressCount;

  return {
    ...video,
    doneDownloading
  };
}
