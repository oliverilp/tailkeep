'use server';

import { fakeDB, type FakeDB } from '@/lib/bullmq';

export interface ReturnType {
  success: boolean;
  data?: FakeDB;
  error?: string;
}

// eslint-disable-next-line @typescript-eslint/require-await -- ignore
export async function getProgress(): Promise<ReturnType> {
  try {
    return { success: true, data: fakeDB };
  } catch (error) {
    return { success: false, error: 'Failed to get tasks.' };
  }
}
