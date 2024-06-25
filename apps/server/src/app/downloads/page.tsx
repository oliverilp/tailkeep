'use client';

import React, { useEffect, useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { Button } from '@/components/ui/button';
import { addVideoAction } from '@/server/actions/add-video';
import { DownloadProgress, DownloadProgressType } from '@/schemas/progress';
import { getVideosAction } from '@/server/actions/get-videos';

function Download(): React.JSX.Element {
  const [progress, setProgress] = useState<DownloadProgressType | null>(null);
  const { execute, result } = useAction(getVideosAction, {
    onSuccess(data) {
      console.log('data', data);
      console.log('result', result);
    }
  });

  const download = async (): Promise<void> => {
    // eslint-disable-next-line no-console -- ignore
    console.log('Adding video..');
    const url = 'https://youtu.be/Ibjm2KHfymo';
    void addVideoAction({ url });

    console.log('result before', result);
    execute();
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
        <div>
          <div>Data:</div>
          <div>{JSON.stringify(result)}</div>
        </div>
        <h2>Add new video working</h2>
        {progress !== null && (
          <>
            <div className="w-fit">Status: {progress.status}</div>
            <div className="w-fit">
              Progress: {Number(progress.progress).toFixed(1)}%
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
