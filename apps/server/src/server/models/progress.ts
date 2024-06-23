import { z } from 'zod';

export const DownloadProgress = z.object({
  status: z.string().nullable(),
  progress: z.number()
});

export type DownloadProgressType = z.infer<typeof DownloadProgress>;
