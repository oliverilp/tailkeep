'use server';

import { z } from 'zod';
import { flattenValidationErrors } from 'next-safe-action';
import { metadataQueue } from '@/lib/bullmq';
import { actionClient } from '@/lib/safe-action';

const UrlSchema = z.object({
  url: z.string().url()
});

export const addVideoAction = actionClient
  .schema(UrlSchema, {
    handleValidationErrorsShape: (ve) => flattenValidationErrors(ve).fieldErrors
  })
  .action(async ({ parsedInput: { url } }) => {
    await metadataQueue.add('metadata', { url });

    console.log('added to queue');
    console.log(
      'info',
      await metadataQueue.getJobCounts(
        'wait',
        'delayed',
        'waiting',
        'active',
        'completed'
      )
    );

    return { message: 'Video added to queue.' };
  });
