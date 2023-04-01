// import btoaNode from 'btoa';
import { ofetch } from 'ofetch';
import { joinURL, withHttps } from 'ufo';
import { definePlugin } from 'core';

import type { ChartConfigurationInstance } from 'chart.js';
import type GitHubPlugin from '~/plugin-github/src';
import type { Octo } from './types';

const categoryStackLegend = (categories: string[]) =>
  <
    NonNullable<
      NonNullable<ChartConfigurationInstance['options']>['plugins']
    >['legend']
  >{
    labels: {
      generateLabels: (chart) =>
        categories.map((text) => {
          const dataset = chart.data.datasets.filter((i) => i.stack === text);
          const datasetIndex =
            dataset.length > 0
              ? chart.data.datasets.findIndex(
                  (i) => i.label === dataset[0].label
                )
              : undefined;

          return {
            text,
            hidden: datasetIndex
              ? chart.getDatasetMeta(datasetIndex).hidden
              : true,
            dataset,
            datasetIndex,
          };
        }),
    },

    onClick: (evt, legendItem, legend) =>
      legend.chart.data.datasets.forEach((dataset, jdx) => {
        if (dataset.stack === legendItem.text) {
          if (legend.chart.isDatasetVisible(jdx)) {
            legend.chart.hide(jdx);
            legendItem.hidden = true;
          } else {
            legend.chart.show(jdx);
            legendItem.hidden = false;
          }
          // legendItem.hidden = !legendItem.hidden;
        }
      }),
  };

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

    const commitData: (Summary & { commit: Octo<'repos', 'getCommit'> })[] = [];
    const issueData: (Summary & { issue: Octo<'issues', 'get'> })[] = [];
    // const pullsData: Summary[] = [];

    if (githubData) {
      const { commits, issues } = githubData as {
        commits: Octo<'repos', 'listCommits'>;
        issues: Octo<'issues', 'listForRepo'>;
        // pulls: Octo<'pulls', 'list'>;
      };

      await Promise.all(
        commits.slice(0, 5).map(async (c, idx, arr) => {
          if (!c.commit.committer?.date) return;
          const start = c.commit.committer.date.slice(0, 10);
          const end = (
            idx > 0
              ? arr[idx - 1].commit.committer?.date || ''
              : new Date().toISOString()
          ).slice(0, 10);

          commitData.push({
            commit: c,
            ...(await getSummary({ start, end }).catch(() => ({} as Summary))),
          });
        })
      );

      issueData.push(
        ...(await Promise.all(
          issues
            .filter((i) => i.closed_at && i.state === 'closed')
            .slice(0, 5)
            .map(async (i) => ({
              issue: i,
              ...(await getSummary({
                start: new Date(i.created_at).toISOString().slice(0, 10),
                end: (i.closed_at ? new Date(i.closed_at) : new Date())
                  .toISOString()
                  .slice(0, 10),
              }).catch(() => ({} as Summary))),
            }))
        ))
      );
    }

    const summaryVerbose = [
      commitData.map((c) => c.data),
      issueData.map((i) => i.data),
    ]
      .flat(2)
      .filter(Boolean)
      .sort((a, b) => Date.parse(a.range.date) - Date.parse(b.range.date));
    // const { data: projectData } = await apiFetch<ProjectData>(`/projects/${project}`);
    const { data: status } = await apiFetch<Status>('/statusbar/today'); // await ofetch.native(`${apiBase}/users/current/statusbar/today?api_key=${credentials}`).then((r) => r.json()) // fallback

    const mixedPie: ChartConfigurationInstance = {
      type: 'pie',
      data: { labels: [], datasets: [] },
      options: {
        plugins: {
          title: { display: true, text: `${status.grand_total.digital}HRS` },
          legend: { display: false },
        },
      },
    };

    const categoriesLine: ChartConfigurationInstance = {
      type: 'line',
      data: { labels: [], datasets: [] },
      options: {
        plugins: {
          title: { display: true, text: `${status.grand_total.digital}HRS` },
          legend: { display: false },
        },
      },
    };

    summaryVerbose.forEach((s) => {
      if (!categoriesLine.data.labels) categoriesLine.data.labels = [];
      if (!categoriesLine.data.labels.includes(s.range.date)) {
        categoriesLine.data.labels.push(s.range.date);
        // categoriesLine.data.datasets.push({
        //   label: 'Categories',
        //   data: s.categories.map((i) => i.total_seconds),
        // });
      }
    });

    Object.entries(status || {}).forEach(([k, v]) => {
      if (
        !Array.isArray(v) ||
        v.length > 25 ||
        // mixedPie.data.datasets.length > 5 ||
        // (mixedPie.data.labels?.length || 0) > 10
        !['categories', 'languages', 'projects'].includes(k) // cherry picking
      )
        return;

      if (isChart) {
        (mixedPie.data.labels || []).push(
          ...v.map(({ name }) => `${name} (${k})`)
        );
        (mixedPie.data.datasets || []).push({
          data: v.map(({ percent }) => percent),
        });
      } else {
        exportData.push({
          title: k,
          data: v.map(({ name, percent }) => ({ name, percent })),
        });
      }
    });

    exportData.push(
      ...(isChart
        ? [
            ...commitData
              .filter((c) => c.commit && c.data)
              .map(({ commit, data }, idx, arr) => {
                const start = (commit.commit.committer?.date || '').slice(
                  0,
                  10
                );
                const end = (
                  idx > 0
                    ? arr[idx - 1].commit.commit.committer?.date || ''
                    : new Date().toISOString()
                ).slice(0, 10);

                const countMap: Record<
                  Extract<
                    keyof Summary['data'][number],
                    'branches' | 'categories' | 'entities' | 'languages' // | 'dependencies' | 'editors' | 'machines' | 'operating_systems'
                  >,
                  Record<string, number[]>
                > = {
                  branches: {},
                  categories: {},
                  entities: {},
                  languages: {},
                };

                data.forEach((d, dIdx) =>
                  (
                    ['branches', 'categories', 'entities', 'languages'] as const
                  ).forEach((i) =>
                    (d[i] || []).forEach((j) => {
                      const { name } = j;
                      if (!countMap[i][name]) {
                        countMap[i][name] = new Array(data.length).fill(0);
                      }

                      countMap[i][name][dIdx] = j.total_seconds;
                    })
                  )
                );

                return <ChartConfigurationInstance[]>[
                  {
                    type: 'bar',
                    data: {
                      labels: data.map((d) => d.range.start),
                      datasets: [
                        {
                          label: 'Seconds spent in a day',
                          data: data.map((d) => d.grand_total.total_seconds),
                          type: 'line',
                        },
                        ...Object.entries(countMap).flatMap(([stack, v]) =>
                          Object.entries(v).map(([label, values]) => ({
                            label,
                            data: values,
                            stack,
                            hidden: !['branches', 'entities'].includes(stack),
                          }))
                        ),
                      ],
                    },
                    options: {
                      scales: {
                        x: { stacked: true, display: false, type: 'time' },
                        y: { stacked: true },
                      },
                      plugins: {
                        title: {
                          display: true,
                          text: `Commit ${commit.sha.slice(0, 7)} (+${
                            commit.stats?.additions || 0
                          } -${commit.stats?.deletions || 0})`,
                        },
                        subtitle: {
                          display: true,
                          text: `${start} to ${end}`,
                        },
                        legend: categoryStackLegend(Object.keys(countMap)),
                      },
                    },
                  },
                  // Performance hog pie charts for each day, each category
                  // ...data.flatMap((d) =>
                  //   Object.keys(countMap).map(
                  //     (c) =>
                  //       <ChartConfigurationInstance>{
                  //         type: 'pie',
                  //         data: {
                  //           labels: d[c as keyof typeof countMap].map(
                  //             (i) => i.name
                  //           ),
                  //           datasets: [
                  //             {
                  //               label: c,
                  //               data: d[c as keyof typeof countMap].map(
                  //                 (i) => i.percent
                  //               ),
                  //             },
                  //           ],
                  //         },
                  //       }
                  //   )
                  // ),
                ];
              })
              .flat(),
            ...issueData
              .filter((i) => i.issue && i.data)
              .map(({ issue, data }) => {
                const start = issue.created_at.slice(0, 10);
                const end = (issue.closed_at || new Date().toISOString()).slice(
                  0,
                  10
                );

                const countMap: Record<
                  Extract<
                    keyof Summary['data'][number],
                    'branches' | 'categories' | 'entities' | 'languages' // | 'dependencies' | 'editors' | 'machines' | 'operating_systems'
                  >,
                  Record<string, number[]>
                > = {
                  branches: {},
                  categories: {},
                  entities: {},
                  languages: {},
                };

                data.forEach((d, dIdx) =>
                  (
                    ['branches', 'categories', 'entities', 'languages'] as const
                  ).forEach((i) =>
                    (d[i] || []).forEach((j) => {
                      const { name } = j;
                      if (!countMap[i][name]) {
                        countMap[i][name] = new Array(data.length).fill(0);
                      }

                      countMap[i][name][dIdx] = j.total_seconds;
                    })
                  )
                );

                return <ChartConfigurationInstance[]>[
                  {
                    type: 'bar',
                    data: {
                      labels: data.map((d) => d.range.start),
                      datasets: [
                        {
                          label: 'Seconds spent in a day',
                          data: data.map((d) => d.grand_total.total_seconds),
                          type: 'line',
                        },
                        ...Object.entries(countMap).flatMap(([stack, v]) =>
                          Object.entries(v).map(([label, values]) => ({
                            label,
                            data: values,
                            stack,
                            hidden: !['categories'].includes(stack),
                          }))
                        ),
                      ],
                    },
                    options: {
                      scales: {
                        x: { stacked: true, display: false, type: 'time' },
                        y: { stacked: true },
                      },
                      plugins: {
                        title: {
                          display: true,
                          text: `Issue #${issue.number}`,
                        },
                        subtitle: {
                          display: true,
                          text: `opened ${start}, closed ${end}`,
                        },
                        legend: categoryStackLegend(Object.keys(countMap)),
                      },
                    },
                  },
                ];
              })
              .flat(),
          ]
        : [
            { title: 'Issue Timeline', data: issueData },
            { title: 'Commit Timeline', data: commitData },
          ])
    );

    return {
      export() {
        return exportData;
      },
    };
  },
});
