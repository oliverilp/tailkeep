import { NextResponse } from 'next/server';
import { progressEmitter } from '@/lib/bullmq';
import type { DownloadProgress } from '@/schemas/progress';

export function GET() {
  const stream = new ReadableStream({
    start(controller) {
      const update = (download: DownloadProgress) => {
        const json = JSON.stringify(download);
        const data = `data: ${json}\n\n`;
        try {
          controller.enqueue(new TextEncoder().encode(data));
        } catch (error) {
          console.error('ReadableStream error for new event.');
        }
      };

      progressEmitter.on('update', update);

      return () => {
        progressEmitter.off('update', update);
      };
    }
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    }
  });
}
