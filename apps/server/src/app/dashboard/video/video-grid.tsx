import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { VideoDto } from '@/schemas/video';
import { cn } from '@/lib/utils';
import NoVideos from './no-videos';

interface VideoGridProps {
  videos: VideoDto[] | undefined;
}

function VideoGrid({ videos }: VideoGridProps) {
  return (
    <div className="h-full w-full">
      <div
        className={cn('flex w-full flex-wrap justify-center gap-8', {
          'h-full': !videos?.length
        })}
      >
        {videos?.length ? (
          <>
            {videos?.map((video) => (
              <Link
                href={`/dashboard/video/${video.id}`}
                key={video.id}
                className="group flex min-h-32 w-80 cursor-pointer flex-col gap-3"
              >
                <div className="relative aspect-video max-w-80 overflow-hidden rounded-xl">
                  <Image
                    alt={video.title}
                    fill
                    className="scale-105 object-cover transition-transform group-hover:scale-100"
                    src={video.thumbnailUrl}
                    sizes="20rem"
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
