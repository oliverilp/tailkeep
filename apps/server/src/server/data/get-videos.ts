import 'server-only';

import prisma from '@/lib/prisma';
import type { VideoDto } from '@/schemas/video';

export async function getVideosAction(): Promise<VideoDto[]> {
  return prisma.video.findMany();
}
