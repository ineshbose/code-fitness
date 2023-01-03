import btoa from 'btoa';
import { ofetch } from 'ofetch';
import type { Octokit } from 'octokit';
import { joinURL, withHttps } from 'ufo';

export default class WakatimePlugin {
  private apiPath: string;

  private credentials: string;

  private githubPlugin: boolean | Octokit;

  private constructor(props: { credentials: string; apiPath?: string }) {
    this.credentials = btoa(props.credentials);
    this.apiPath = joinURL(
      withHttps(props.apiPath || 'https://wakatime.com/api/v1'),
      '/users/current'
    );

    try {
      this.githubPlugin = require('github-plugin');
    } catch {
      this.githubPlugin = false;
    }
  }

  public getProjectData(project: string) {
    return ofetch(joinURL(this.apiPath, '/projects', project), {
      headers: { Authorization: `Basic ${this.credentials}` },
    });
  }

  public getSummary(params: {
    start: string;
    end: string;
    project?: string;
    branches?: string;
    timeout?: number;
    writes_only?: boolean;
    timezone?: string;
    range?: string;
  }) {
    return ofetch(joinURL(this.apiPath, '/summaries'), {
      headers: { Authorization: `Basic ${this.credentials}` },
      params,
    });
  }
}
