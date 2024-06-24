'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { addToQueue } from '@/server/actions/add';
import {
  DownloadProgress,
  DownloadProgressType
} from '@/server/models/progress';

function Download(): React.JSX.Element {
  const [progress, setProgress] = useState<DownloadProgressType | null>(null);

  const download = (): void => {
    // eslint-disable-next-line no-console -- ignore
    console.log('Adding video..');
    void addToQueue('https://youtu.be/Ibjm2KHfymo');
  };

  useEffect(() => {
    const eventSource = new EventSource('/api/sse');

    eventSource.onmessage = (event: MessageEvent<string>) => {
      console.log('onmessage', event.data);

      const parsedJSON = JSON.parse(event.data);
      const validationResult = DownloadProgress.safeParse(parsedJSON);
      if (!validationResult.success) {
        return;
      }

      const download = validationResult.data;
      setProgress(download);
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <h2>Add new video working</h2>
        {progress !== null && (
          <>
            <div className="w-fit">Status: {progress?.status}</div>
            <div className="w-fit">
              Progress: {Number(progress?.progress).toFixed(1)}%
            </div>
          </>
        )}
      </div>

      <Button variant="outline" onClick={download}>
        Download
      </Button>
    </>
  );
}

export default Download;
