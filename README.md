# Tailkeep - YouTube Video Archiver

[Demo Website](https://demo.tailkeep.org/)

## Description

Tailkeep is a free and open-source web application designed to help users download and archive YouTube videos. The primary motivation behind this project is to give users control over their data, especially in the context of the increasing tendency of big tech companies like YouTube to remove videos due to copyright strikes or other reasons. This is particularly relevant for music videos, song remixes, movie soundtracks and other content that might be taken down.

## Motivation

- **Control Over Data:** Users can have their own copies of videos, ensuring they are not lost due to removal from YouTube.
- **Preservation of Content:** Helps in archiving videos that might be removed due to copyright issues or creator's decisions.

## Features

- Download and archive YouTube videos.
- View and manage downloaded videos through a user-friendly dashboard.
- Store video metadata for easy retrieval and management.

## Architecture

The application is structured into two main components:

1. **Server (Next.js App):** Handles the web interface, user authentication, and video management.
2. **Worker:** Manages the downloading and processing of videos in the background.

### Technologies Used

- **TypeScript**
- **React**
- **Next.js**
- **Tailwind CSS**
- **Server-Sent Events (SSE)**
- **PostgreSQL (with Prisma)**
- **Redis**
- **BullMQ**
- **PNPM**
- **Docker**
- **Traefik**

### Message Queues

The system uses Redis and BullMQ for handling background tasks and message queues. This ensures that video downloading and processing tasks do not interfere with the main application’s performance.

### Data Storage

Data is stored in PostgreSQL, managed through Prisma, which allows for efficient querying and data manipulation.

## Implemented features

- [x] Github Actions for CI/CD
- [x] Traefik HTTP/3 protocol support
- [ ] Remove any editing/updates on public demo server
- [ ] Implement logging with pino library
- [ ] Add feature to change account's username
- [ ] Fix some video playback problems by switching from native to custom player like react-player
- [ ] Add video transcoding to stream lower quality versions for slow networks by using HLS and DASH protocols with ffmpeg and [nginx-rtmp-module](https://github.com/arut/nginx-rtmp-module)
- [ ] Add feature to download entire channel's video content
- [ ] Add feature to subscribe to new video releases for channels
- [ ] Add feature to to create playlists in WEB UI
