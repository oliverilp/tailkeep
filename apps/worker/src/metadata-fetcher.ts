import { CommandExecutor } from './command-executor';

export interface Metadata {
  youtubeId: string;
  url: string;
  title: string;
  uploader: string;
  channelId: string;
  channelUrl: string;
  durationString: string;
  duration: number;
  thumbnailUrl: string;
  description: string;
  viewCount: number;
  commentCount: number;
  filename: string;
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
    console.log('metadata finished', json.title);
    const output = {
      youtubeId: json.id,
      url: json.webpage_url,
      title: json.title,
      uploader: json.uploader,
      channelId: json.channel_id,
      channelUrl: json.channel_url,
      durationString: json.duration_string,
      duration: json.duration,
      thumbnailUrl: json.thumbnail,
      description: json.description,
      viewCount: json.view_count,
      commentCount: json.comment_count,
      filename: json.filename
    };

    return output;
  }
}
