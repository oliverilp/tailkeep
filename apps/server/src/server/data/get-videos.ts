import 'server-only';

import prisma from '@/lib/prisma';
import { MetadataDtoType } from '@/schemas/metadata';

export async function getVideosAction(): Promise<MetadataDtoType[]> {
  const videos = await prisma.video.findMany();

  return videos;
}
