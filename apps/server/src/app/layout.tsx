import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import { cn } from '@/lib/utils';
import Events from './Events';
import Header from '@/components/header';
import Sidenav from '@/components/sidenav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tailkeep',
  description: 'YouTube Downloader UI'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body
        className={cn('bg-background font-sans antialiased', inter.className)}
      >
        <Events />
        <div className="bg-muted/40 flex min-h-screen w-full">
          <Sidenav />
          <div className="flex grow flex-col sm:gap-4 sm:py-4">
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
