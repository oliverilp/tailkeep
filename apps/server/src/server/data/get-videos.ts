import 'server-only';

import prisma from '@/lib/prisma';
import type { VideoDto } from '@/schemas/video';

export async function getVideos(): Promise<VideoDto[]> {
  const videos = await prisma.video.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
  // Convert JS date objects to ISO strings
  return JSON.parse(JSON.stringify(videos));
}
