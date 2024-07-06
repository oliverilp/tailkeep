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
  // {
  //   name: 'Dashboard',
  //   href: '/dashboard'
  // },
  {
    name: 'Downloads',
    href: '/dashboard/downloads'
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
    name: 'Tasks',
    href: '/dashboard/tasks'
  },
  {
    name: 'Settings',
    href: '/dashboard/settings'
  }
];
