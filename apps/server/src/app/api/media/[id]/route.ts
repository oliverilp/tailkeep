import path from 'path';
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getVideoById } from '@/server/data/get-video-by-id';
import { validateRequest } from '@/lib/auth';

const MEDIA_DIRECTORY = process.env.VIDEOS_PATH;

const idSchema = z.string();

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { user } = await validateRequest();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;

  const parsedResult = idSchema.safeParse(id);
  if (!MEDIA_DIRECTORY || !parsedResult.success) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }

  const video = await getVideoById(parsedResult.data);
  if (!video) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  const filepath = path.join(MEDIA_DIRECTORY, video.filename);
  if (!fs.existsSync(filepath)) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  return NextResponse.json({ filepath: video.filename });
}
