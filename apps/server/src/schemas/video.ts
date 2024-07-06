import { z } from 'zod';

export const videoSchema = z.object({
  youtubeId: z.string(),
  url: z.string(),
  title: z.string(),
  uploader: z.string(),
  channelId: z.string(),
  channelUrl: z.string(),
  durationString: z.string(),
  duration: z.number(),
  thumbnailUrl: z.string(),
  description: z.string(),
  viewCount: z.number(),
  commentCount: z.number(),
  filename: z.string()
});

export type Video = z.infer<typeof videoSchema>;

export const videoDtoSchema = videoSchema.extend({
  id: z.string(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date())
});

export type VideoDto = z.infer<typeof videoDtoSchema>;
