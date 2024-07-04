'use server';

import { z } from 'zod';
import { flattenValidationErrors } from 'next-safe-action';
import { metadataQueue } from '@/lib/bullmq';
import { actionClient } from '@/lib/safe-action';

const urlSchema = z.object({
  url: z.string().url()
});

export const addVideoAction = actionClient
  .schema(urlSchema, {
    handleValidationErrorsShape: (ve) => flattenValidationErrors(ve).fieldErrors
  })
  .action(async ({ parsedInput: { url } }) => {
    const urlObject = new URL(url);
    urlObject.search = '';

    await metadataQueue.add('metadata', { url: urlObject.toString() });

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
