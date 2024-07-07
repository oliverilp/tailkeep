import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { VideoDto } from '@/schemas/video';
import NoVideos from './no-videos';

interface VideoGridProps {
  videos: VideoDto[] | undefined;
}

function VideoGrid({ videos }: VideoGridProps) {
  return (
    <div className="h-full w-full">
      <div className="flex h-full w-full flex-wrap gap-8">
        {videos?.length ? (
          <>
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
          </>
        ) : (
          <div className="grid w-full place-items-center">
            <NoVideos />
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoGrid;
