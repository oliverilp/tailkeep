import React from 'react';
import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Header from '@/components/header';
import Sidenav from '@/components/sidenav';

async function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();
  if (!user) {
    return redirect('/login');
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
