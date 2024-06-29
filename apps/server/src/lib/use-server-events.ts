import {
  DownloadProgressDto,
  downloadProgressDtoSchema
} from '@/schemas/progress';
import { useEffect, useState } from 'react';

export function useServerEvents(
  initialData: DownloadProgressDto[]
): DownloadProgressDto[] {
  const [data, setData] = useState<DownloadProgressDto[]>(initialData);

  useEffect(() => {
    const eventSource = new EventSource('/api/sse');

    eventSource.onmessage = (event: MessageEvent<string>) => {
      console.log('onmessage', event.data);
      const json: unknown = JSON.parse(event.data);
      const newData = downloadProgressDtoSchema.array().parse(json);

      setData(newData);
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return data;
}
