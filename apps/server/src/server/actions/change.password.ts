'use server';

import * as argon2 from 'argon2';
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
