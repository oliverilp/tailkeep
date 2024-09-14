import {
  DownloadsDashboard,
  downloadsDashboardSchema
} from '@/schemas/downloads-dashboard';
import { useEffect, useState } from 'react';

export function useServerEvents(
  initialData: DownloadsDashboard
): DownloadsDashboard {
  const [data, setData] = useState<DownloadsDashboard>(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    const eventSource = new EventSource('/api/sse');

    eventSource.onmessage = (event: MessageEvent<string>) => {
      const json: unknown = JSON.parse(event.data);
      const newData = downloadsDashboardSchema.parse(json);

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
