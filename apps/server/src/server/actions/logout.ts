'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { actionClient } from '@/lib/safe-action';
import { lucia, validateRequest } from '@/lib/auth';

export const logoutAction = actionClient.action(async () => {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: 'Unauthorized'
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect('/login');
});
