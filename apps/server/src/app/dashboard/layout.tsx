import React from 'react';
import Header from '@/components/header';
import Sidenav from '@/components/sidenav';
import { auth } from '@/auth';

async function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  console.log('session.user', session?.user);

  if (!session) {
    return <h1>You are not authorized.</h1>;
  }

  return (
    <div className="bg-muted/40 flex min-h-screen w-full">
      <Sidenav />
      <div className="flex grow flex-col sm:gap-4 sm:py-4">
        <Header />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
