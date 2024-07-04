'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import * as argon2 from 'argon2';
import { flattenValidationErrors } from 'next-safe-action';
import { actionClient } from '@/lib/safe-action';
import { loginSchema } from '@/schemas/login';
import { lucia } from '@/lib/auth';
import { getUser } from '@/server/data/get-user';

export const loginAction = actionClient
  .schema(loginSchema, {
    handleValidationErrorsShape: (ve) => flattenValidationErrors(ve).fieldErrors
  })
  .action(async ({ parsedInput: { username, password } }) => {
    const existingUser = await getUser(username);
    if (!existingUser) {
      console.log('no username');
      return {
        error: 'Incorrect username or password'
      };
    }

    const isValidPassword = await argon2.verify(
      existingUser.password,
      password
    );

    if (!isValidPassword) {
      // NOTE:
      // Returning immediately allows malicious actors to figure out valid usernames from response times,
      // allowing them to only focus on guessing passwords in brute-force attacks.
      // As a preventive measure, you may want to hash passwords even for invalid usernames.
      // However, valid usernames can be already be revealed with the signup page among other methods.
      // It will also be much more resource intensive.
      // Since protecting against this is non-trivial,
      // it is crucial your implementation is protected against brute-force attacks with login throttling, 2FA, etc.
      // If usernames are public, you can outright tell the user that the username is invalid.
      console.log('bad password');
      return {
        error: 'Incorrect username or password'
      };
    }

    console.log('successfully signed in user');

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return redirect('/dashboard');
  });
