import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import { cn } from '@/lib/utils';
import Events from './Events';

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
        {children}
      </body>
    </html>
  );
}
