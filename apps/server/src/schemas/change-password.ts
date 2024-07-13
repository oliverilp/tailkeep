import { z } from 'zod';

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(8, {
    message: 'Password must be at least 8 characters.'
  }),
  newPassword: z.string().min(8, {
    message: 'Password must be at least 8 characters.'
  }),
  confirmNewPassword: z.string().min(8, {
    message: 'Password must be at least 8 characters.'
  })
});

export type ChangePassword = z.infer<typeof changePasswordSchema>;
