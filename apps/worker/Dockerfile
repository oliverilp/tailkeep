FROM node:20-bookworm-slim

WORKDIR /app

# Add NPM global to PATH.
ENV PATH=${NPM_GLOBAL}/bin:${PATH}

# Upgrade deps
RUN apt-get update && apt-get -y upgrade

# Install base dependencies
RUN export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends curl xattr \
    python3-minimal python-is-python3 python3-pip \
    python3-certifi python3-websockets python3-requests python3-brotli \
    python3-mutagen ffmpeg atomicparsley \
    && apt autoremove -y --purge \
    && apt clean \
    && rm -rf /var/lib/apt/lists/*

# Install youtube-dl
RUN mkdir -p /home/node/.local/bin \
    && curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /home/node/.local/bin/yt-dlp \
    && chmod a+rx /home/node/.local/bin/yt-dlp  # Make executable

# Add youtube-dl to global path
RUN test -e /home/node/.local/bin/yt-dlp \
    && ln -s /home/node/.local/bin/yt-dlp /usr/local/bin/yt-dlp 

COPY . .

RUN corepack enable pnpm && pnpm i --frozen-lockfile
RUN pnpm run build

USER node

CMD HOSTNAME="0.0.0.0" node dist/index.js
