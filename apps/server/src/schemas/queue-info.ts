import { z } from 'zod';

export const queueInfoSchema = z.object({
  queue: z.number().nonnegative(),
  active: z.number().nonnegative(),
  finished: z.number().nonnegative(),
  failed: z.number().nonnegative()
});

export type QueueInfo = z.infer<typeof queueInfoSchema>;
