import React from 'react';
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
      <div>
        <Player video={video} />
      </div>
      <h4 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {video?.title}
      </h4>
      <div className="font-semibold">{video.uploader}</div>
      <div className="pb-12 pt-6">
        {video.description.split('\n').map((line) => (
          <p>{line}</p>
        ))}
      </div>
    </div>
  );
}

export default VideoDetails;
