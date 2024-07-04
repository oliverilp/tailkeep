import 'server-only';

import prisma from '@/lib/prisma';

export async function getUser(username: string) {
  try {
    return await prisma.user.findUnique({
      where: {
        username
      }
    });
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
