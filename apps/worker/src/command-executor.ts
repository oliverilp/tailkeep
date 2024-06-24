import {
  ChildProcessWithoutNullStreams,
  spawn,
  SpawnOptionsWithoutStdio
} from 'child_process';

export type DataCallback = (data: string) => void;

export class CommandExecutor {
  private childProcess: ChildProcessWithoutNullStreams | null = null;

  execute(args: string[], onDataCallback: DataCallback): Promise<void> {
    return new Promise((resolve, reject) => {
      const command: string = 'yt-dlp';
      const options: SpawnOptionsWithoutStdio = {
        // cwd: '/workspace' // Optional: Set working directory
        // env: { ...process.env, CUSTOM_VAR: 'value' } // Optional: Set environment variables
      };
      this.childProcess = spawn(command, args, options);

      this.childProcess.stdout.on('data', (data: Buffer) => {
        onDataCallback(data.toString());
      });

      this.childProcess.stderr.on('data', (data: Buffer) => {
        reject(new Error(data.toString()));
        this.childProcess = null; // Ensure childProcess is cleared
      });

      this.childProcess.on('close', (code: number) => {
        if (code !== 0) {
          reject(new Error(`Process exited with code ${code}`));
        } else {
          resolve();
        }
        this.childProcess = null; // Ensure childProcess is cleared
      });

      this.childProcess.on('error', (err: Error) => {
        reject(err);
        this.childProcess = null; // Ensure childProcess is cleared
      });
    });
  }

  kill(): void {
    if (this.childProcess) {
      this.childProcess.kill();
      this.childProcess = null;
    }
  }
}
