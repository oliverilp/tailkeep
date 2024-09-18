import path from 'path';
import { lstat, symlink } from 'node:fs/promises';
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getVideoById } from '@/server/data/get-video-by-id';
import { validateRequest } from '@/lib/auth';

const MEDIA_PATH = process.env.MEDIA_PATH;
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

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
  if (!MEDIA_PATH || !parsedResult.success) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }

  const video = await getVideoById(parsedResult.data);
  if (!video) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  const filepath = path.join(MEDIA_PATH, video.filename);
  if (!fs.existsSync(filepath)) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  try {
    await createSymlink(MEDIA_PATH);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }

  // Find the corresponding image file by checking for supported image extensions
  let imagePath: string | null = null;
  const baseFilename = path.parse(video.filename).name;

  for (const ext of IMAGE_EXTENSIONS) {
    const potentialImagePath = path.join(MEDIA_PATH, `${baseFilename}${ext}`);
    if (fs.existsSync(potentialImagePath)) {
      imagePath = path.basename(potentialImagePath);
      break;
    }
  }

  return NextResponse.json({ videoPath: video.filename, imagePath });
}

async function createSymlink(mediaPath: string) {
  const publicPath = path.resolve(process.cwd(), './public/media/');

  try {
    if (fs.existsSync(publicPath)) {
      const stats = await lstat(publicPath);
      if (stats.isSymbolicLink()) {
        return;
      }
    }

    await symlink(mediaPath, publicPath, 'dir');
  } catch (error) {
    throw new Error(`Failed to create symbolic link: ${error}`);
  }
}
