/* eslint-disable @typescript-eslint/no-unused-vars */
import btoa from 'btoa';
import { ofetch } from 'ofetch';
import type { Octokit } from 'octokit';
import { joinURL, withHttps } from 'ufo';
import { definePlugin } from 'core';

export default definePlugin({
  name: 'wakatime-plugin',
  props: {
    credentials: {},
    apiPath: { default: 'https://wakatime.com/api/v1' },
  },
  setup(resolvedOptions, _core) {
    const credentials = btoa(resolvedOptions.credentials);
    const apiPath = joinURL(
      withHttps(resolvedOptions.apiPath),
      '/users/current'
    );

    let githubPlugin: Octokit | undefined | any;

    try {
      githubPlugin = require('github-plugin');
    } catch {
      githubPlugin = undefined;
    }

    function getProjectData(project: string) {
      return ofetch(joinURL(apiPath, '/projects', project), {
        headers: { Authorization: `Basic ${credentials}` },
      });
    }

    function getSummary(params: {
      start: string;
      end: string;
      project?: string;
      branches?: string;
      timeout?: number;
      writes_only?: boolean;
      timezone?: string;
      range?: string;
    }) {
      return ofetch(joinURL(apiPath, '/summaries'), {
        headers: { Authorization: `Basic ${credentials}` },
        params,
      });
    }

    return {
      export: () => [],
    };
  },
});
