import type { z } from 'zod';
import type { ActionState } from '@/lib/create-safe-action';
import type { VideoAdd } from './schema';

export type InputType = z.infer<typeof VideoAdd>;
export type ReturnType = ActionState<InputType, null>;
