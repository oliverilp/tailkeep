'use server';

import { flattenValidationErrors } from 'next-safe-action';
import { actionClient } from '@/lib/safe-action';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { Login, loginSchema } from '@/schemas/login';

export async function loginApi(credentials: Login) {
  await signIn('credentials', credentials);

  console.log('success');
}

export const loginAction = actionClient
  .schema(loginSchema, {
    handleValidationErrorsShape: (ve) => flattenValidationErrors(ve).fieldErrors
  })
  .action(async ({ parsedInput }) => {
    try {
      console.log('');
      console.log('');
      console.log('');
      console.log('');
      console.log('login', await signIn('credentials', parsedInput));
      // redirect('/dashboard/downloads');
      return { message: 'Successfully signed in.', success: true };
    } catch (error) {
      console.log(error);
      return { message: 'Invalid credentials.' };
    }
  });
