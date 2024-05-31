'use client';

import { Button } from '@/components/ui/Button';
import { videoAdd } from '@/server/actions/video-add';
import React from 'react';

function Download() {
  const download = () => {
    console.log('Adding video..');
    void videoAdd({ url: '123' });
  };

  return (
    <>
      <div>Add new video:</div>
      <Button variant="outline" onClick={download}>
        Download
      </Button>
    </>
  );
}

export default Download;
