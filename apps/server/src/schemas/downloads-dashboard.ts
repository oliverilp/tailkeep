import { z } from 'zod';
import { queueInfoSchema } from './queue-info';
import { downloadProgressDtoSchema } from './progress';

export const downloadsDashboardSchema = z.object({
  queueInfo: queueInfoSchema,
  downloads: downloadProgressDtoSchema.array()
});

export type DownloadsDashboard = z.infer<typeof downloadsDashboardSchema>;
