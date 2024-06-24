import { z } from 'zod';

export const DownloadProgress = z.object({
  videoId: z.number(),
  active: z.boolean(),
  status: z.string().nullable(),
  progress: z.number(),
  size: z.string().nullable(),
  speed: z.string().nullable(),
  eta: z.string().nullable()
});

export type DownloadProgressType = z.infer<typeof DownloadProgress>;
