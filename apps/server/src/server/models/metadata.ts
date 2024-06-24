import { z } from 'zod';

export const Metadata = z.object({
  videoId: z.string(),
  url: z.string(),
  title: z.string(),
  uploader: z.string(),
  duration: z.string(),
  thumbnailUrl: z.string(),
  description: z.string(),
  viewCount: z.number(),
  commentCount: z.number()
});

export type MetadataType = z.infer<typeof Metadata>;
