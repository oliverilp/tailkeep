'use client';

import React from 'react';
import { Button } from '../components/ui/Button';
import { videoAdd } from '../server/actions/video-add';

function Download(): React.JSX.Element {
  const download = (): void => {
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
