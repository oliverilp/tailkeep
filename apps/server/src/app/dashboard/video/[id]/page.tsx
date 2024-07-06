import React from 'react';
import { getVideoById } from '@/server/data/get-video-by-id';
import { z } from 'zod';
import Image from 'next/image';
import Player from './player';

interface VideoDetailsProps {
  params: {
    id: number;
  };
}

const idSchema = z.string();

async function VideoDetails({ params }: VideoDetailsProps) {
  const parsed = idSchema.safeParse(params.id);

  if (!parsed.success) {
    return <div>404 - cannot be found</div>;
  }

  const video = await getVideoById(parsed.data);
  if (!video) {
    return <div>404 - cannot be found</div>;
  }

  return (
    <div className="flex max-w-5xl flex-col gap-4">
      <div className="h-full w-full">
        {video.doneDownloading ? (
          <Player video={video} />
        ) : (
          <figure className="relative">
            <div className="w-full overflow-hidden rounded-xl">
              <Image
                alt="Video thumbnail"
                className="aspect-video w-full scale-105 blur-md brightness-50 filter"
                height="1280"
                width="720"
                src={video.thumbnailUrl}
              />
            </div>
            <figcaption className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform text-center text-2xl font-semibold text-white sm:text-4xl">
              This video is still downloading.
            </figcaption>
          </figure>
        )}
      </div>
      <h4 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {video?.title}
      </h4>
      <div className="font-semibold">{video.uploader}</div>
      <div className="pb-12 pt-6">
        {video.description.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
}

export default VideoDetails;
