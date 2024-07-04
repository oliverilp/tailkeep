import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { progressEmitter } from '@/lib/bullmq';
import type { DownloadProgress } from '@/schemas/progress';
import { validateRequest } from '@/lib/auth';

// API for server-sent events.
export async function GET() {
  const { user } = await validateRequest();
  if (!user) {
    return new Response('Unauthorized', {
      status: 401
    });
  }

  const stream = new ReadableStream({
    start(controller) {
      const update = (download: DownloadProgress) => {
        // Unsubscribe to event listener when connection is closed.
        if (!stream.locked) {
          progressEmitter.off('update', update);
          return;
        }

        const json = JSON.stringify(download);
        const data = `data: ${json}\n\n`;
        controller.enqueue(new TextEncoder().encode(data));
      };

      progressEmitter.on('update', update);
    }
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Content-Encoding': 'none',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    }
  });
}
