'use server';

import { actionClient } from '@/lib/safe-action';
import { redirect } from 'next/navigation';
// import { signOut } from '@/auth';

export const logoutAction = actionClient.action(async ({}) => {
  try {
    // await signOut();
    redirect('/dashboard/downloads');
  } catch (error) {
    return { message: 'Failed to sign out.' };
  }
});
