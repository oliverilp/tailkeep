import React from 'react';
import Link from 'next/link';
import {
  Home,
  Tv,
  Download,
  Video,
  ListVideo,
  GalleryVerticalEnd,
  Settings
} from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from '@/components/ui/tooltip';

function Wide() {
  return (
    <div className="hidden min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid lg:grid-cols-[280px_1fr]">
      <div className="hidden md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-medium">
              <div className="bg-primary text-primary-foreground group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg md:h-8 md:w-8 md:text-base">
                <Tv className="h-4 w-4 transition-all group-hover:scale-110" />
              </div>
              <span className="hidden text-lg lg:inline-block">Tailkeep</span>
            </Link>
          </div>
          <div className="flex h-full flex-col justify-between">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-all"
              >
                <Home className="h-5 w-5" />
                <span className="hidden lg:inline-block">Dashboard</span>
              </Link>
              <Link
                href="#"
                className="bg-muted text-foreground hover:text-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-base font-semibold  transition-all hover:font-semibold"
              >
                <Download className="h-5 w-5" />
                <span className="hidden lg:inline-block">Downloads</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-all"
              >
                <Video className="h-5 w-5" />
                <span className="hidden lg:inline-block">Videos</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-all"
              >
                <ListVideo className="h-5 w-5" />
                <span className="hidden lg:inline-block">Subscriptions</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-all"
              >
                <GalleryVerticalEnd className="h-5 w-5" />
                <span className="hidden lg:inline-block">Tasks</span>
              </Link>
            </nav>
            <nav className="grid items-start px-2 pb-5 text-sm font-medium lg:px-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-all"
              >
                <Settings className="h-5 w-5" />
                <span className="hidden lg:inline-block">Settings</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

function Narrow() {
  return (
    <div className="inset-y-0 left-0 h-full w-14 flex-col sm:flex lg:hidden">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="#"
          className="bg-primary text-primary-foreground group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:h-8 md:w-8 md:text-base"
        >
          <Tv className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Tailkeep</span>
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
            >
              <Home className="h-5 w-5" />
              <span className="sr-only">Dashboard</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Dashboard</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="bg-accent text-accent-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
            >
              <Download className="h-5 w-5" />
              <span className="sr-only">Downloads</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Downloads</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
            >
              <Video className="h-5 w-5" />
              <span className="sr-only">Videos</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Videos</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
            >
              <ListVideo className="h-5 w-5" />
              <span className="sr-only">Subscriptions</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Subscriptions</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
            >
              <GalleryVerticalEnd className="h-5 w-5" />
              <span className="sr-only">Tasks</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Tasks</TooltipContent>
        </Tooltip>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </div>
  );
}

// TODO: Fix duplicate code. Combine <Narrow /> and <Wide /> to a single component.
function Sidenav() {
  return (
    <aside className="bg-background inset-y-0 left-0 z-10 hidden flex-col border-r sm:flex">
      <TooltipProvider>
        <Narrow />
        <Wide />
      </TooltipProvider>
    </aside>
  );
}

export default Sidenav;
