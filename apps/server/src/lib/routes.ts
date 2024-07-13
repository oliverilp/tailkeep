export type RouteName =
  | 'Dashboard'
  | 'Downloads'
  | 'Videos'
  | 'Subscriptions'
  | 'Logs'
  | 'Settings';

export type Route = {
  name: RouteName;
  href: string;
};

export const routes: Route[] = [
  // {
  //   name: 'Dashboard',
  //   href: '/dashboard'
  // },
  {
    name: 'Downloads',
    href: '/dashboard/download'
  },
  {
    name: 'Videos',
    href: '/dashboard/video'
  },
  {
    name: 'Subscriptions',
    href: '/dashboard/subscriptions'
  },
  {
    name: 'Logs',
    href: '/dashboard/logs'
  },
  {
    name: 'Settings',
    href: '/dashboard/settings'
  }
];
