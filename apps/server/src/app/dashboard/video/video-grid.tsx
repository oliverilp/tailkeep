import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { VideoDto } from '@/schemas/video';

interface VideoGridProps {
  videos: VideoDto[] | undefined;
}

function VideoGrid({ videos }: VideoGridProps) {
  return (
    <div>
      <div className="flex flex-wrap gap-8">
        {videos?.map((video) => (
          <Link
            href={`/dashboard/video/${video.id}`}
            key={video.id}
            className="group flex min-h-32 w-80 cursor-pointer flex-col gap-3"
          >
            <div className="aspect-video max-w-80 overflow-hidden rounded-xl">
              <Image
                alt="Video thumbnail"
                className="scale-105 object-cover transition-transform group-hover:scale-100"
                height="1280"
                width="720"
                src={video.thumbnailUrl}
              />
            </div>
            <div className="text- font-medium">{video.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default VideoGrid;
