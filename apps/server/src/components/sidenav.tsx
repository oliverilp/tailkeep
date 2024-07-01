'use client';

import React from 'react';
import Link from 'next/link';
import { Tv } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from '@/components/ui/tooltip';
import { Route, routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import NavIcon from './nav-icon';

function NavLinkWide({ link }: { link: Route }) {
  const pathname = usePathname();

  return (
    <Link
      href={link.href}
      className={cn(
        'text-muted-foreground hover:text-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-all',
        {
          'bg-muted text-foreground font-semibold': pathname === link.href
        }
      )}
    >
      <NavIcon name={link.name} />
      <span className="hidden lg:inline-block">{link.name}</span>
    </Link>
  );
}

function Wide() {
  return (
    <div className="hidden min-h-screen w-full md:grid-cols-[220px_1fr] xl:grid xl:grid-cols-[280px_1fr]">
      <div className="fixed hidden h-screen w-[280px] md:block">
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
              {routes
                .filter((link) => link.name !== 'Settings')
                .map((link) => (
                  <NavLinkWide link={link} key={link.href} />
                ))}
            </nav>
            <nav className="grid items-start px-2 pb-5 text-sm font-medium lg:px-4">
              {routes
                .filter((link) => link.name === 'Settings')
                .map((link) => (
                  <NavLinkWide link={link} key={link.href} />
                ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavLinkNarrow({ link }: { link: Route }) {
  const pathname = usePathname();

  return (
    <Tooltip key={link.href}>
      <TooltipTrigger asChild>
        <Link
          href={link.href}
          className={cn(
            'text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8',
            {
              'bg-accent text-accent-foreground': pathname === link.href
            }
          )}
        >
          <NavIcon name={link.name} />
          <span className="sr-only">{link.name}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{link.name}</TooltipContent>
    </Tooltip>
  );
}

function Narrow() {
  return (
    <div className="inset-y-0 left-0 min-h-screen w-14 xl:hidden">
      <div className="fixed min-h-screen w-14 flex-col justify-between sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="/"
            className="bg-primary text-primary-foreground group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:h-8 md:w-8 md:text-base"
          >
            <Tv className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Tailkeep</span>
          </Link>
          {routes
            .filter((link) => link.name !== 'Settings')
            .map((link) => (
              <NavLinkNarrow link={link} key={link.href} />
            ))}
        </nav>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          {routes
            .filter((link) => link.name === 'Settings')
            .map((link) => (
              <NavLinkNarrow link={link} key={link.href} />
            ))}
        </nav>
      </div>
    </div>
  );
}

// TODO: Fix duplicate code. Combine <Narrow /> and <Wide /> to a single component.
function Sidenav() {
  return (
    <aside className="bg-background relative inset-y-0 left-0 z-10 hidden flex-col border-r sm:flex">
      <TooltipProvider>
        <Narrow />
        <Wide />
      </TooltipProvider>
    </aside>
  );
}

export default Sidenav;
