'use client';

import React, { useEffect } from 'react';

function Download(): React.JSX.Element {
  useEffect(() => {
    const eventSource = new EventSource('/api/sse');

    eventSource.onmessage = (event: MessageEvent<string>) => {
      console.log('onmessage', event.data);
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return <>{/* <div>Events</div> */}</>;
}

export default Download;
