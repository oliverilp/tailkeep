import 'server-only';

import prisma from '@/lib/prisma';
import type { VideoDto } from '@/schemas/video';

export async function getVideos(): Promise<VideoDto[]> {
  // Filter out videos that are still downloading or have no downloads at all.
  return prisma.video.findMany({
    where: {
      progressList: {
        some: {}
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}
