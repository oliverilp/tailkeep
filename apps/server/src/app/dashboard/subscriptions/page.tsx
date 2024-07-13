import { Button } from '@/components/ui/button';
import { Download, Link, ListVideo } from 'lucide-react';
import React from 'react';

function Subscriptions() {
  return (
    <div className="grid h-full w-full place-items-center">
      <div className="flex w-full flex-col items-center">
        <ListVideo className="text-muted-foreground mb-2 h-12 w-12" />
        <div className="font-semibold">Subscriptions page</div>
        <div className="text-muted-foreground">
          This feature is coming soon™.
        </div>
        <Link className="pt-6" href="/dashboard/download">
          <Button>
            <Download className="mr-2 h-4 w-4" />
            <span>Download Video</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Subscriptions;
