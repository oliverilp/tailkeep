import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters.' })
  .max(100, { message: 'Maximum password length is 128 characters.' });
