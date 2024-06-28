import { z } from 'zod';
import { MetadataDto } from './metadata';

export const DownloadProgress = z.object({
  videoId: z.number(),
  jobId: z.number(),
  active: z.boolean(),
  status: z.string().nullable(),
  progress: z.number(),
  size: z.string().nullable(),
  speed: z.string().nullable(),
  eta: z.string().nullable()
});

export type DownloadProgressType = z.infer<typeof DownloadProgress>;

export const DownloadProgressDto = DownloadProgress.extend({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  video: MetadataDto
});

export type DownloadProgressDtoType = z.infer<typeof DownloadProgressDto>;
