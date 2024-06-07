import { z } from 'zod';

export const VideoAdd = z.object({
  url: z.string().url()
});
