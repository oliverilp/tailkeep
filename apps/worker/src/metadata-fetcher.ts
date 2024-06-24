import { CommandExecutor } from './command-executor';

export interface Metadata {
  videoId: string;
  url: string;
  title: string;
  uploader: string;
  duration: string;
  thumbnailUrl: string;
  description: string;
  viewCount: number;
  commentCount: number;
}

export type ProgressCallback = (data: Metadata) => void;

export class MetadataFetcher {
  private cmd: CommandExecutor;
  private json = '';

  constructor(private url: string) {
    this.cmd = new CommandExecutor();
  }

  onOutput(data: string) {
    this.json += data;
  }

  async fetch(): Promise<Metadata> {
    const args = ['-j', this.url];
    await this.cmd.execute(args, (text: string) => this.onOutput(text));

    const json = JSON.parse(this.json);
    const output = {
      videoId: json.id,
      url: json.webpage_url,
      title: json.title,
      uploader: json.uploader,
      duration: json.duration_string,
      thumbnailUrl: json.thumbnail,
      description: json.description,
      viewCount: json.view_count,
      commentCount: json.comment_count
    };

    return output;
  }
}
