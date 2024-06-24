import { z } from 'zod';

export const DownloadProgress = z.object({
  active: z.boolean().nullable(),
  status: z.string().nullable(),
  progress: z.number(),
  size: z.string(),
  speed: z.string(),
  eta: z.string()
});

export type DownloadProgressType = z.infer<typeof DownloadProgress>;
