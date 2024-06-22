'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
// import { videoAdd } from '@/server/actions/video-add';
import { addToQueue } from '@/server/actions/add';
import { getProgress } from '@/server/data/get-progress';

function Download(): React.JSX.Element {
  const [status, setStatus] = useState<string | null>('');
  const [progress, setProgress] = useState<string | null>('');

  const download = (): void => {
    // eslint-disable-next-line no-console -- ignore
    console.log('Adding video..');
    // void videoAdd({ url: '123' });
    void addToQueue('youtube.com');
  };

  const poll = async () => {
    const newProgress = await getProgress();
    if (newProgress.success && newProgress.data) {
      const data = newProgress.data.download;
      console.log('poll', data.progress);
      setStatus(data.status);
      setProgress(data.progress);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      void poll();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <h2>Add new video</h2>
        <div className="w-fit">Status: {status}</div>
        <div className="w-fit">Progress: {progress}</div>
      </div>

      <Button variant="outline" onClick={download}>
        Download
      </Button>
    </>
  );
}

export default Download;
