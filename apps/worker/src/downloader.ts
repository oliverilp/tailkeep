import { CommandExecutor } from './command-executor';

export interface DownloadProgress {
  status: string | null;
  progress: string | null;
}

export type ProgressCallback = (data: DownloadProgress) => void;

export class Downloader {
  private cmd: CommandExecutor;

  constructor() {
    this.cmd = new CommandExecutor();
  }

  onOutput(text: string): DownloadProgress {
    // Example line to parse:
    // [download]  12.6% of ~  65.76MiB at    3.14MiB/s ETA 00:15 (frag 3/42)
    const downloadRegex =
      /\[(.*?)\]\s+(\d+\.?\d*%)\s+of\s+~?\s+(\d+\.\d+\w{1,3})\s+(?:in \d+:\d+(?::\d+)?\s+)?at\s+(\d+\.\d+\w{1,3}\/s)(?:\s+ETA\s+(?:(\d+:\d+(?::\d+)?)|Unknown))?/;
    const categoryRegex = /\[(.*?)\]/;

    // const text = data.toString();
    const downloadMatch = text.match(downloadRegex);
    const statusMatch = text.match(categoryRegex);

    let status = null;
    if (statusMatch) {
      const [value] = statusMatch;
      status = value;

      // if (value === '[download]') {
      //   console.log(text);
      // }
    }

    let progress = null;
    if (downloadMatch) {
      const [fullMatch, group1, group2, group3, group4, group5] = downloadMatch;
      const percentage = parseFloat(group2);

      // console.log('Full Match:', fullMatch);
      // console.log('Group 1 (Text inside brackets):', group1);
      // console.log('Download:', group2);
      // console.log('Group 3 (Download total size):', group3);
      // console.log('Group 4 (Speed):', group4);
      // console.log('Group 5 (Time remaining):', group5);

      progress = group2;
    } else {
      // console.log('No match found:');
      // console.log(text);
    }

    return { status, progress };
  }

  onError(text: string) {
    console.error('Download error:', text);
  }

  onClose(text: string) {
    console.error('Download finished:', text);
  }

  async download(
    url: string,
    progressCallback: ProgressCallback
  ): Promise<void> {
    await this.cmd.execute(url, (text: string) =>
      progressCallback(this.onOutput(text))
    );
  }
}
