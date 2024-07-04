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
            href={`/dashboard/videos/${video.id}`}
            key={video.id}
            className="flex min-h-32 w-[300px] cursor-pointer flex-col gap-3"
          >
            <Image
              alt="Video thumbnail"
              className="aspect-video rounded-xl object-cover"
              height="1280"
              width="720"
              src={video.thumbnailUrl}
            />
            <div className="text- font-medium">{video.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default VideoGrid;
