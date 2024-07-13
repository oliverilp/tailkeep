import { Button } from '@/components/ui/button';
import { Download, Link, FileClock } from 'lucide-react';
import React from 'react';

function Logs() {
  return (
    <div className="grid h-full w-full place-items-center">
      <div className="flex w-full flex-col items-center">
        <FileClock className="text-muted-foreground mb-2 h-12 w-12" />
        <div className="font-semibold">Logs page</div>
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

export default Logs;
