import React from 'react';
import {
  Home,
  Settings,
  ListVideo,
  GalleryVerticalEnd,
  Download,
  Video
} from 'lucide-react';

import { RouteName } from '@/lib/routes';

interface NavProps {
  name: RouteName;
}

function NavIcon({ name }: NavProps) {
  const icons = {
    Dashboard: <Home className="h-5 w-5" />,
    Downloads: <Download className="h-5 w-5" />,
    Videos: <Video className="h-5 w-5" />,
    Subscriptions: <ListVideo className="h-5 w-5" />,
    Tasks: <GalleryVerticalEnd className="h-5 w-5" />,
    Settings: <Settings className="h-5 w-5" />
  };

  return icons[name];
}

export default NavIcon;
