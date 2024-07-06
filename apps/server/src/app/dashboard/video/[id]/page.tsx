import React from 'react';
import Image from 'next/image';
import { getVideoById } from '@/server/data/get-video-by-id';
import { z } from 'zod';
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
      {/* <Image
        alt="Video thumbnail"
        className="aspect-video rounded-xl object-cover"
        height="1280"
        width="720"
        src={video.thumbnailUrl}
      /> */}
      <div>
        <Player video={video} />
      </div>
      <h4 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {video?.title}
      </h4>
      <div className="font-semibold">{video.uploader}</div>
      <div className="pt-6">{video.description}</div>
    </div>
  );
}

export default VideoDetails;
