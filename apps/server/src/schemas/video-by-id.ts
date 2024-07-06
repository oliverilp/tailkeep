import { z } from 'zod';
import { videoDtoSchema } from './video';

export const videoByIdDtoSchema = videoDtoSchema.extend({
  doneDownloading: z.boolean()
});

export type VideoByIdDto = z.infer<typeof videoByIdDtoSchema>;
