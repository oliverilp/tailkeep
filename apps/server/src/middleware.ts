import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!(pathname.startsWith('/video/') || pathname.startsWith('/image/'))) {
    return NextResponse.next();
  }

  const regex = /^\/(video|image)\/([0-9a-z-]{36})$/;
  const match = pathname.match(regex);

  if (!match?.[1] || !match?.[2]) {
    return NextResponse.json({ error: 'Not allowed' }, { status: 403 });
  }
  const uuid = match[2];

  const headers = new Headers(request.headers);

  const fetchUrl = `http://localhost:3000/api/media-location/${uuid}`;
  const response = await fetch(fetchUrl, { headers: headers });
  const { videoPath, imagePath, error } = await response.json();

  if (error) {
    console.error('error', error);
    return NextResponse.json({ error }, { status: response.status });
  }

  if (match[1] === 'image' && !imagePath) {
    return NextResponse.json({ error: 'Image not found.' }, { status: 404 });
  }
  const responsePath = match[1] === 'video' ? videoPath : imagePath;

  const url = request.nextUrl.clone();
  url.pathname = `/youtube/${responsePath}`;

  return NextResponse.rewrite(url);
}
