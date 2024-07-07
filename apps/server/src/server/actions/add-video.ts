'use server';

import { z } from 'zod';
import { flattenValidationErrors } from 'next-safe-action';
import { metadataQueue } from '@/lib/bullmq';
import { authActionClient } from '@/lib/safe-action';
import { sleep } from '@/lib/utils';

const urlSchema = z.object({
  url: z.string().url()
});

export const addVideoAction = authActionClient
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

    // Delay the response to give the UI time to display a spinner.
    // Since the message queue worker processes requests asynchronously,
    // it's better to wait briefly, as the request completion is not instantaneous.
    await sleep(500);

    return { message: 'Video added to queue.' };
  });
