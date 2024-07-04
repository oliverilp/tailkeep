// import NextAuth from 'next-auth';
// import { authOptions } from '@/server/auth';

// import { handlers } from '@/auth';

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

// import { authOptions } from '@/auth';
// import NextAuth from 'next-auth';

// export const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

import { handlers } from '@/auth';
export const { GET, POST } = handlers;
