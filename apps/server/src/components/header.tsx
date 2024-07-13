'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CircleUser, Tv, PanelLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import NavIcon from '@/components/nav-icon';
import { logoutAction } from '@/server/actions/logout';
import BreadcrumbLinks from './breadcrumb-links';

function header() {
  const pathname = usePathname();

  const handleLogout = () => {
    console.log('logging out');
    void logoutAction();
  };

  return (
    <header className="bg-background sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-8">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="bg-primary text-primary-foreground group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-xl text-lg font-semibold md:text-base"
            >
              <Tv className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Tailkeep</span>
            </Link>

            {routes.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className={cn(
                  'text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5',
                  { 'text-foreground': pathname === link.href }
                )}
              >
                <NavIcon name={link.name} />
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <BreadcrumbLinks />
      <div className="relative ml-auto flex-1 md:grow-0">
        {/* <Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
        <Input
          type="search"
          placeholder="Search..."
          className="bg-background w-full rounded-lg pl-8 md:w-[200px] lg:w-[336px]"
        /> */}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/dashboard/settings">
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

export default header;
