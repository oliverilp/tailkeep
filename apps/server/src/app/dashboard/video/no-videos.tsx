import React from 'react';
import { SquarePlay, Download } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function NoVideos() {
  return (
    <div className="flex w-full flex-col items-center">
      <SquarePlay className="text-muted-foreground mb-2 h-12 w-12" />
      <div className="font-semibold">No videos</div>
      <div className="text-muted-foreground">
        Get started by adding a new video.
      </div>
      <Link className="pt-6" href="/dashboard/download">
        <Button>
          <Download className="mr-2 h-4 w-4" />
          <span>Download Video</span>
        </Button>
      </Link>
    </div>
  );
}

export default NoVideos;
