'use server';

import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

export const getProgressesAction = actionClient.action(async () => {
  const progresses = await prisma.videoProgress.findMany();

  return progresses;
});
