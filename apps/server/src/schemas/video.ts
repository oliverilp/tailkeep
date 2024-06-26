import { z } from 'zod';

export const videoSchema = z.object({
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

export type Video = z.infer<typeof videoSchema>;

export const videoDtoSchema = videoSchema.extend({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export type VideoDto = z.infer<typeof videoDtoSchema>;
