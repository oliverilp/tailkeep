import React from 'react';

interface DownloadsLayoutProps {
  children: React.ReactNode;
}

export function DownloadsLayout({ children }: DownloadsLayoutProps) {
  return (
    <main className="grid h-full w-full items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      {children}
    </main>
  );
}

export default DownloadsLayout;
