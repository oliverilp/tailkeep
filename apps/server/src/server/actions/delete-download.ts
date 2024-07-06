'use server';

import { z } from 'zod';
import { flattenValidationErrors } from 'next-safe-action';
import { authActionClient } from '@/lib/safe-action';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const idSchema = z.object({
  id: z.string()
});

export const deleteDownloadAction = authActionClient
  .schema(idSchema, {
    handleValidationErrorsShape: (ve) => flattenValidationErrors(ve).fieldErrors
  })
  .action(async ({ parsedInput: { id } }) => {
    await prisma.videoProgress.delete({
      where: { id }
    });

    revalidatePath('/dashboard/downloads');
    return { message: 'Download deleted succesfully.' };
  });
