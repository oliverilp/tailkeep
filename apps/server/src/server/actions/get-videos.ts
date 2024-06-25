'use server';

import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

export const getVideosAction = actionClient.action(async () => {
  const videos = await prisma.video.findMany();

  return videos;
});
