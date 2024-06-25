import Link from 'next/link';
import { Home, Settings, Tv, Download, Video } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function Example() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="bg-muted/40 hidden border-r md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-medium">
              <div className="bg-primary text-primary-foreground group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg md:h-8 md:w-8 md:text-base">
                <Tv className="h-5 w-5 transition-all group-hover:scale-110" />
              </div>
              <span className="text-lg">Tailkeep</span>
            </Link>
          </div>
          <div className="flex h-full flex-col justify-between">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-all"
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-all"
              >
                <Download className="h-5 w-5" />
                Downloads
              </Link>
              <Link
                href="#"
                className="bg-muted text-foreground hover:text-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-base font-semibold  transition-all hover:font-semibold"
              >
                <Video className="h-5 w-5" />
                Videos
              </Link>
            </nav>
            <nav className="grid items-start px-2 pb-5 text-sm font-medium lg:px-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-all"
              >
                <Settings className="h-5 w-5" />
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
