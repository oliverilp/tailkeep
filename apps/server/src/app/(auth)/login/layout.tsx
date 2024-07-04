import React from 'react';
import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';

async function LoginLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();
  if (user) {
    return redirect('/dashboard');
  }

  return <div className="h-full w-full">{children}</div>;
}

export default LoginLayout;
