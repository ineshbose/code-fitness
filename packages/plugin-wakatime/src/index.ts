// import btoaNode from 'btoa';
import { ofetch } from 'ofetch';
import { joinURL, withHttps } from 'ufo';
import { definePlugin } from 'core';

import type { ChartConfigurationInstance } from 'chart.js';
import type GitHubPlugin from '~/plugin-github/src';
import type { Octo } from './types';

export default definePlugin({
  name: 'wakatime',
  props: {
    credentials: {},
    project: {},
    apiBase: { default: 'https://api.wakatime.com/api/v1' },
  },
  async setup(resolvedOptions, core) {
    const isChart = core.config.charts || false;
    const exportData: Array<
      typeof isChart extends infer _T
        ? _T extends true
          ? ChartConfigurationInstance
          : { title: string; data: any[] }
        : never
    > = [];

    const { credentials, project, apiBase } = resolvedOptions;
    const apiFetch = ofetch.create({
      baseURL: joinURL(
        apiBase.includes('localhost') ? apiBase : withHttps(apiBase),
        '/users/current'
      ),
      params: { api_key: credentials },
    });

    function getSummary(params: {
      start?: string;
      end?: string;
      project?: string;
      branches?: string;
      timeout?: number;
      writes_only?: boolean;
      timezone?: string;
      range?: 'today' | 'yesterday' | 'last_7_days';
    }) {
      return apiFetch<Summary>('/summaries', {
        params: { api_key: credentials, project, ...params },
        retry: 3,
      });
    }

    const githubData:
      | (ReturnType<
          Awaited<
            ReturnType<ReturnType<typeof GitHubPlugin>['setup']>
          >['raw'] extends infer R_
            ? R_ extends (...args: any) => any
              ? R_
              : never
            : never
        > &
          Record<'issues' | 'commits', any[]>)
      | undefined
      | any =
      core.plugins.github && core.plugins.github.raw
        ? core.plugins.github.raw()
        : undefined;

    if (githubData) {
      const { issues }: { issues: Octo<'issues', 'listForRepo'> } = githubData;
      issues.map(async (i) => {
        return getSummary({
          start: new Date(i.created_at).toISOString().slice(0, 10),
          end: (i.closed_at ? new Date(i.closed_at) : new Date())
            .toISOString()
            .slice(0, 10),
        }).catch(() => undefined);
      });
    }

    // const { data: projectData } = await apiFetch<ProjectData>(
    //   `/projects/${project}`
    // );
    const { data: status } = await apiFetch<Status>('/statusbar/today'); // await ofetch.native(`${apiBase}/users/current/statusbar/today?api_key=${credentials}`).then((r) => r.json()) // fallback

    const graph: ChartConfigurationInstance = {
      type: 'pie',
      data: { labels: [], datasets: [] },
      options: {
        plugins: {
          title: { display: true, text: `${status.grand_total.digital}HRS` },
          legend: { display: false },
        },
      },
    };

    Object.entries(status || {}).forEach(([k, v]) => {
      if (
        !Array.isArray(v) ||
        v.length > 25 // ||
        // graph.data.datasets.length > 5 ||
        // (graph.data.labels?.length || 0) > 10
      )
        return;

      if (isChart) {
        (graph.data.labels || []).push(
          ...v.map(({ name }) => `${name} (${k})`)
        );
        (graph.data.datasets || []).push({
          data: v.map(({ percent }) => percent),
        });
      } else {
        exportData.push({
          title: k,
          data: v.map(({ name, percent }) => ({ name, percent })),
        });
      }
    });

    if (isChart) {
      exportData.push(graph);
    }

    return {
      export() {
        return exportData;
      },
    };
  },
});
