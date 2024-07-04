import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  createSafeActionClient
} from 'next-safe-action';
import { redirect } from 'next/navigation';
import { validateRequest } from '@/lib/auth';

class ActionError extends Error {}

export const actionClient = createSafeActionClient({
  handleReturnedServerError(e) {
    if (e instanceof ActionError) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  }
});

export const authActionClient = actionClient.use(async ({ next }) => {
  const { user } = await validateRequest();
  if (!user) {
    return redirect('/login');
  }

  return next({ ctx: null });
});
