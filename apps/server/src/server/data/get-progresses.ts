import 'server-only';

import prisma from '@/lib/prisma';
import type { DownloadProgressDto } from '@/schemas/progress';

export async function getProgressesAction(): Promise<DownloadProgressDto[]> {
  return prisma.videoProgress.findMany({
    include: {
      video: true
    }
  });
}
