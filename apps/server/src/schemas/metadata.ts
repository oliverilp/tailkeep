import { number, z } from 'zod';

export const Metadata = z.object({
  youtubeId: z.string(),
  url: z.string(),
  title: z.string(),
  uploader: z.string(),
  durationString: z.string(),
  duration: z.number(),
  thumbnailUrl: z.string(),
  description: z.string(),
  viewCount: z.number(),
  commentCount: z.number()
});

export type MetadataType = z.infer<typeof Metadata>;

export const MetadataDto = Metadata.extend({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type MetadataDtoType = z.infer<typeof MetadataDto>;
