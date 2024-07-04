import React from 'react';

interface VideoDetailsProps {
  params: {
    id: number;
  };
}

function VideoDetails({ params }: VideoDetailsProps) {
  return (
    <div>
      <span>Video id:</span>
      <span>{params.id}</span>
    </div>
  );
}

export default VideoDetails;
