import { z } from 'zod';
import { passwordSchema } from './password';

export const changePasswordSchema = z.object({
  oldPassword: passwordSchema,
  newPassword: passwordSchema,
  confirmNewPassword: passwordSchema
});

export type ChangePassword = z.infer<typeof changePasswordSchema>;
