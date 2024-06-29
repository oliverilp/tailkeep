import 'server-only';

import prisma from '@/lib/prisma';
import type { DownloadProgressDto } from '@/schemas/progress';

export async function getProgresses(): Promise<DownloadProgressDto[]> {
  const progresses = await prisma.videoProgress.findMany({
    include: {
      video: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Convert JS date objects to ISO strings
  return JSON.parse(JSON.stringify(progresses));
}
