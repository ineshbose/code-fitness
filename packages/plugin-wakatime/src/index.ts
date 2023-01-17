import btoa from 'btoa';
import { ofetch } from 'ofetch';
import { joinURL, withHttps } from 'ufo';
import { definePlugin } from 'core';
import type { PluginConfig } from 'core';

export default definePlugin({
  name: 'wakatime-plugin',
  props: {
    credentials: {},
    project: {},
    apiBase: { default: 'https://wakatime.com/api/v1' },
  },
  async setup(resolvedOptions, core) {
    const isChart = core.config.charts || false;

    const { credentials, project, apiBase } = resolvedOptions;
    const apiFetch = ofetch.create({
      baseURL: joinURL(withHttps(apiBase), '/users/current'),
      headers: { Authorization: `Basic ${btoa(credentials)}` },
    });

    const githubPlugin = core.config.plugins?.find(
      (p: PluginConfig) =>
        typeof p !== 'function' &&
        (Array.isArray(p) ? p[0] : p).includes('github')
    );

    function getProjectData(projectName: string) {
      return apiFetch(`/projects/${projectName}`);
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
      return apiFetch('/summaries', { params });
    }

    const exportData = [
      await getProjectData(project),
      await getSummary({ project, start: ``, end: `` }),
    ];

    return {
      export: () => [
        ...exportData,
        // { title: '', data: getProjectData(project) },
        // { title: '', data: getSummary({ project, start: '', end: '' }) },
      ],
    };
  },
});