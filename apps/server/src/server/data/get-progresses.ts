import 'server-only';

import prisma from '@/lib/prisma';
import { DownloadProgressDto } from '@/schemas/progress';

export async function getProgressesAction(): Promise<DownloadProgressDto[]> {
  const progresses = await prisma.videoProgress.findMany({
    include: {
      video: true
    }
  });

  return progresses;
}
