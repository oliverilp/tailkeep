import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const regex = /^\/video\/([0-9a-z-]+)$/;
  const match = request.nextUrl.pathname.match(regex);

  if (!match?.[1]) {
    return NextResponse.next();
  }
  const uuid = match[1];

  const headers = new Headers(request.headers);

  const fetchUrl = `http://localhost:3000/api/media/${uuid}`;
  const response = await fetch(fetchUrl, { headers: headers });
  const { filepath, error } = await response.json();

  if (error || !filepath) {
    return NextResponse.json({ error }, { status: response.status });
  }
  const nginxHost = process.env.NGINX_HOST ?? 'localhost';
  const nginxPort = process.env.NGINX_PORT ?? '8000';

  const url = request.nextUrl.clone();
  url.hostname = nginxHost;
  url.port = nginxPort;
  url.protocol = 'http';
  url.pathname = filepath;

  return NextResponse.rewrite(url);
}
