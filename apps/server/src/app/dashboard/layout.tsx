import React from 'react';
import Header from '@/components/header';
import Sidenav from '@/components/sidenav';

function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
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
