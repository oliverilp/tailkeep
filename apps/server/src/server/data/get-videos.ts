import 'server-only';

import prisma from '@/lib/prisma';
import { VideoDto } from '@/schemas/video';

export async function getVideosAction(): Promise<VideoDto[]> {
  const videos = await prisma.video.findMany();

  return videos;
}
