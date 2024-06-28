import 'server-only';

import prisma from '@/lib/prisma';
import { DownloadProgressDtoType } from '@/schemas/progress';

export async function getProgressesAction(): Promise<
  DownloadProgressDtoType[]
> {
  const progresses = await prisma.videoProgress.findMany({
    include: {
      video: true
    }
  });

  return progresses;
}
