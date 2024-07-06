import { VideoDto } from '@/schemas/video';
import React from 'react';

interface PlayerProps {
  video: VideoDto;
}

function Player({ video }: PlayerProps) {
  return (
    <video
      className="aspect-video h-full w-full rounded-xl object-cover"
      poster={video.thumbnailUrl}
      controls
      autoPlay={false}
    >
      <source src={`/video/${video.id}`} type="video/mp4" />
    </video>
  );
}

export default Player;
