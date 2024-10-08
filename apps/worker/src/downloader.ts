import { promises as fs } from 'fs';
import * as path from 'path';
import { CommandExecutor } from './command-executor';
import { formatSize, parseSize } from './filesize';

export interface DownloadProgress {
  videoId: string;
  jobId: number;
  status: string | null;
  progress: number;
  size: string | null;
  speed: string | null;
  eta: string | null;
}

export type ProgressCallback = (data: DownloadProgress) => void;

export class Downloader {
  private cmd: CommandExecutor;
  private status: string | null = null;
  private progress: number = 0;
  private size: string | null = null;
  private speed: string | null = null;
  private eta: string | null = null;

  constructor(
    private videoId: string,
    private jobId: number,
    private url: string,
    private filename: string
  ) {
    this.cmd = new CommandExecutor();
  }

  get downloadProgress(): DownloadProgress {
    return {
      videoId: this.videoId,
      jobId: this.jobId,
      status: this.status,
      progress: this.progress,
      size: this.size,
      speed: this.speed,
      eta: this.eta
    };
  }

  onOutput(text: string): DownloadProgress {
    // Example line to parse:
    // [download]  12.6% of ~  65.76MiB at    3.14MiB/s ETA 00:15 (frag 3/42)
    console.log(text);

    const downloadRegex =
      /\[(.*?)\]\s+(\d+\.?\d*%)\s+of\s+~?\s+(\d+\.\d+\w{1,3})\s+(?:in \d+:\d+(?::\d+)?\s+)?at\s+(\d+\.\d+\w{1,3}\/s)(?:\s+ETA\s+(?:(\d+:\d+(?::\d+)?)|Unknown))?\s+\(frag (\d+)\/\d+\)/;
    const categoryRegex = /^(?:\[)(.*?)(?:\])/;

    const downloadMatch = text.match(downloadRegex);
    const statusMatch = text.match(categoryRegex);

    if (statusMatch) {
      const [_fullmatch, value] = statusMatch;
      this.status = value;
    }

    if (downloadMatch) {
      const [_fullMatch, status, progress, totalSize, speed, eta, frag] =
        downloadMatch;
      const percentage = parseFloat(progress);

      const sizeInBytes = parseSize(totalSize);
      const lastSizeInBytes = parseSize(this.size ?? '0B');

      const thresholdMultiplier = 2.5;
      const isSizeWithinThreshold =
        sizeInBytes >= lastSizeInBytes / thresholdMultiplier &&
        sizeInBytes <= lastSizeInBytes * thresholdMultiplier;
      const isValidSize = this.progress < 30 || isSizeWithinThreshold;

      if (status) {
        this.status = status;
      }
      if (isValidSize) {
        this.size = totalSize;
      }
      if (speed) {
        this.speed = speed;
      }
      if (eta) {
        this.eta = eta;
      }

      if (percentage >= this.progress && parseInt(frag) > 0) {
        this.progress = percentage;
      }
    } else {
      // console.log('No match found:');
      // console.log(text);
    }

    return this.downloadProgress;
  }

  onError(text: string) {
    console.error('Download error:', text);
  }

  onClose(text: string) {
    console.error('Download finished:', text);
  }

  async download(
    progressCallback: ProgressCallback
  ): Promise<DownloadProgress> {
    const args = [this.url];
    await this.cmd.execute(args, (text: string) =>
      progressCallback(this.onOutput(text))
    );

    try {
      const filePath = path.join(
        process.env.MEDIA_PATH ?? '/youtube',
        this.filename
      );
      const stats = await fs.stat(filePath);
      this.size = formatSize(stats.size);
    } catch (error) {
      console.error('Error getting file size', error);
    }

    return this.downloadProgress;
  }
}
