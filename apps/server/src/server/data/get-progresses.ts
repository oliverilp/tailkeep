import 'server-only';

import prisma from '@/lib/prisma';
import type { DownloadProgressDto } from '@/schemas/progress';

export async function getProgresses(): Promise<DownloadProgressDto[]> {
  return await prisma.videoProgress.findMany({
    include: {
      video: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}
