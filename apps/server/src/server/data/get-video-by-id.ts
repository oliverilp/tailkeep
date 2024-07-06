import 'server-only';

import prisma from '@/lib/prisma';
import type { VideoDto } from '@/schemas/video';

export async function getVideoById(id: string): Promise<VideoDto | null> {
  return await prisma.video.findUnique({
    where: {
      id
    }
  });
}
