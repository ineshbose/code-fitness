import fs from 'fs';
import { platform } from 'os';
import { join } from 'path';
import { workspace, Uri } from 'vscode';

/**
 * This is a utility class for the project's dependencies.
 * Ideally this would not be here.
 */
export default class DepUtils {
  homeDir: string;

  wakatimeConfig: string;

  wakatimeKey: string;

  wakatimeProjectName: string;

  constructor(uri: Uri) {
    const home = process.env.WAKATIME_HOME;

    this.homeDir =
      home && home.trim() && fs.existsSync(home.trim())
        ? home.trim()
        : process.env.VSCODE_PORTABLE ||
          process.env[platform() === 'win32' ? 'USERPROFILE' : 'HOME'] ||
          process.cwd();

    this.wakatimeConfig = join(this.homeDir, '.wakatime.cfg');
    const rawWakaKey =
      fs
        .readFileSync(this.wakatimeConfig, 'utf-8')
        .match(/api_key\s*=\s*(\S+)/)
        ?.pop() || '';
    this.wakatimeKey = rawWakaKey.startsWith('waka_')
      ? rawWakaKey
      : `waka_${rawWakaKey}`;

    this.wakatimeProjectName = this.getProjectName(uri);
  }

  // eslint-disable-next-line class-methods-use-this
  private getProjectName(uri: Uri) {
    if (!workspace) return '';
    const workspaceFolder = workspace.getWorkspaceFolder(uri);
    if (workspaceFolder) {
      try {
        return workspaceFolder.name;
      } catch (e) {
        return '';
      }
    }
    if (workspace.workspaceFolders && workspace.workspaceFolders.length) {
      return workspace.workspaceFolders[0].name;
    }
    return workspace.name || '';
  }
}
