import { z } from 'zod';
import { videoDtoSchema } from './video';

export const downloadProgressSchema = z.object({
  videoId: z.number(),
  jobId: z.number(),
  active: z.boolean(),
  status: z.string().nullable(),
  progress: z.number(),
  size: z.string().nullable(),
  speed: z.string().nullable(),
  eta: z.string().nullable()
});

export type DownloadProgress = z.infer<typeof downloadProgressSchema>;

export const downloadProgressDtoSchema = downloadProgressSchema.extend({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  video: videoDtoSchema
});

export type DownloadProgressDto = z.infer<typeof downloadProgressDtoSchema>;
