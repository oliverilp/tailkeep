import React from 'react';

interface VideoLayoutProps {
  children: React.ReactNode;
}

function VideoLayout({ children }: VideoLayoutProps) {
  return (
    <main className="grid h-full w-full items-start gap-4 p-4 sm:px-8 sm:py-0 md:gap-8">
      {children}
    </main>
  );
}

export default VideoLayout;
