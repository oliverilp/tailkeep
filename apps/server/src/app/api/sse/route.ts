import { NextRequest, NextResponse } from 'next/server';
import { DownloadProgressType, progressEmitter } from '@/lib/bullmq';

export async function GET(req: NextRequest) {
  const stream = new ReadableStream({
    start(controller) {
      let counter = 0;

      const update = (download: DownloadProgressType) => {
        console.log('Got update begging')
        console.log(download);
        console.log('end')
        const base64 = JSON.stringify(download);
        const data = `data: ${base64}\n\n`;
        try {
          controller.enqueue(new TextEncoder().encode(data));          
        } catch (error) {
          console.error('ReadableStream error for new event.');
        }
      }

      progressEmitter.on('update', update);

      const sendInterval = () => {
        counter++;
        const data = `data: ${counter}\n\n`;
        controller.enqueue(new TextEncoder().encode(data));

        // Stop the stream after 10 events
        if (counter === 100000000) {
          clearInterval(interval);
          controller.close();
        }
      }
      const interval = setInterval(sendInterval, 30 * 60 * 1000);
      sendInterval();


      return () => {
        clearInterval(interval);
        progressEmitter.off('update', update);
      };
    },
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}