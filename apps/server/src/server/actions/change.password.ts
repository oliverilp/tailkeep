'use server';

import * as argon2 from '@node-rs/argon2';
import { flattenValidationErrors } from 'next-safe-action';
import { authActionClient } from '@/lib/safe-action';
import { validateRequest } from '@/lib/auth';
import { getUser } from '@/server/data/get-user';
import { changePasswordSchema } from '@/schemas/change-password';
import prisma from '@/lib/prisma';

export const changePasswordAction = authActionClient
  .schema(changePasswordSchema, {
    handleValidationErrorsShape: (ve) => flattenValidationErrors(ve).fieldErrors
  })
  .action(
    async ({
      parsedInput: { oldPassword, newPassword, confirmNewPassword }
    }) => {
      const isDemo = process.env.DEMO_MODE === 'true';
      if (isDemo) {
        return { error: 'Editing password is disabled in demo environment.' };
      }

      const { user: authUser } = await validateRequest();
      if (!authUser) {
        return { error: 'Unauthorized.' };
      }

      const user = await getUser(authUser.username);
      if (!user) {
        return { error: 'Unauthorized.' };
      }

      const isValidPassword = await argon2.verify(user.password, oldPassword);
      if (!isValidPassword) {
        return {
          error: 'Incorrect password.'
        };
      }

      if (newPassword !== confirmNewPassword) {
        return {
          error: 'Passwords do not match.'
        };
      }

      if (newPassword === oldPassword) {
        return {
          error: 'Your new password must be different from the old password.'
        };
      }

      const hash = await argon2.hash(newPassword);
      await prisma.user.update({
        data: {
          password: hash
        },
        where: {
          id: user.id
        }
      });

      return { message: 'Password updated sucessfully.' };
    }
  );
