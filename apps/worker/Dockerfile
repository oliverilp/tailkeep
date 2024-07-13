FROM node:20-bookworm

WORKDIR /app

# Add NPM global to PATH.
ENV PATH=${NPM_GLOBAL}/bin:${PATH}

# Install base dependencies
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends xattr \
    python3-minimal python-is-python3 python3-pip \
    python3-certifi python3-websockets python3-requests python3-brotli \
    python3-mutagen ffmpeg atomicparsley \
    && apt autoremove -y --purge \
    && apt clean \
    && rm -rf /var/lib/apt/lists/*

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 worker
RUN usermod -a -G nodejs worker

# Install youtube-dl
RUN mkdir -p /home/worker/.local/bin \
    && curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /home/worker/.local/bin/yt-dlp \
    && chmod a+rx /home/worker/.local/bin/yt-dlp  # Make executable \
    && ln -s /home/worker/.local/bin/yt-dlp /usr/local/bin/yt-dlp 

COPY . .

RUN corepack enable pnpm && pnpm i --frozen-lockfile
RUN pnpm run build

USER worker

CMD HOSTNAME="0.0.0.0" node dist/index.js
