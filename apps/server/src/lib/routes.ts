export type RouteName =
  | 'Dashboard'
  | 'Downloads'
  | 'Videos'
  | 'Subscriptions'
  | 'Tasks'
  | 'Settings';

export type Route = {
  name: RouteName;
  href: string;
};

export const routes: Route[] = [
  {
    name: 'Dashboard',
    href: '/'
  },
  {
    name: 'Downloads',
    href: '/downloads'
  },
  {
    name: 'Videos',
    href: '/videos'
  },
  {
    name: 'Subscriptions',
    href: '/subscriptions'
  },
  {
    name: 'Tasks',
    href: '/tasks'
  },
  {
    name: 'Settings',
    href: '/settings'
  }
];
