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
      // Returning immediately allows malicious actors to figure out valid usernames from response times,
      // allowing them to only focus on guessing passwords in brute-force attacks.
      // As a preventive measure, we will hash passwords even for invalid usernames.
      await argon2.hash(password);
      return {
        error: 'Incorrect username or password'
      };
    }

    const isValidPassword = await argon2.verify(
      existingUser.password,
      password
    );

    if (!isValidPassword) {
      return {
        error: 'Incorrect username or password'
      };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return redirect('/dashboard');
  });
