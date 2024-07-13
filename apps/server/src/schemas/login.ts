import { z } from 'zod';
import { passwordSchema } from './password';

export const loginSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  password: passwordSchema
});

export type Login = z.infer<typeof loginSchema>;
