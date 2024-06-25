import { CommandExecutor } from './command-executor';

export interface DownloadProgress {
  videoId: number;
  jobId: number;
  active: boolean;
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
    private videoId: number,
    private jobId: number,
    private url: string
  ) {
    this.cmd = new CommandExecutor();
  }

  onOutput(text: string): DownloadProgress {
    // Example line to parse:
    // [download]  12.6% of ~  65.76MiB at    3.14MiB/s ETA 00:15 (frag 3/42)
    const downloadRegex =
      /\[(.*?)\]\s+(\d+\.?\d*%)\s+of\s+~?\s+(\d+\.\d+\w{1,3})\s+(?:in \d+:\d+(?::\d+)?\s+)?at\s+(\d+\.\d+\w{1,3}\/s)(?:\s+ETA\s+(?:(\d+:\d+(?::\d+)?)|Unknown))?/;
    const categoryRegex = /^\[(.*?)\]/;

    const downloadMatch = text.match(downloadRegex);
    const statusMatch = text.match(categoryRegex);

    if (statusMatch) {
      const [value] = statusMatch;
      this.status = value;
    }

    if (downloadMatch) {
      const [_fullMatch, _status, progress, totalSize, speed, eta] =
        downloadMatch;
      const percentage = parseFloat(progress);

      if (totalSize && parseFloat(totalSize) >= parseFloat(this.size ?? '0')) {
        this.size = totalSize;
      }
      if (speed) {
        this.speed = speed;
      }
      if (eta) {
        this.eta = eta;
      }

      if (percentage >= this.progress) {
        this.progress = percentage;
      }
    } else {
      // console.log('No match found:');
      // console.log(text);
    }

    return {
      videoId: this.videoId,
      jobId: this.jobId,
      active: true,
      status: this.status,
      progress: this.progress,
      size: this.size,
      speed: this.speed,
      eta: this.eta
    };
  }

  onError(text: string) {
    console.error('Download error:', text);
  }

  onClose(text: string) {
    console.error('Download finished:', text);
  }

  async download(progressCallback: ProgressCallback): Promise<void> {
    const args = [this.url];
    await this.cmd.execute(args, (text: string) =>
      progressCallback(this.onOutput(text))
    );
  }
}
