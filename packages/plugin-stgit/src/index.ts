import { Gitlab } from '@gitbeaker/browser';
import { definePlugin } from 'core';

type Counter<D extends string = 'date'> = { [k in D]: string } & {
  count: number;
};

const propercase = (str: string) =>
  str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const HOST = 'https://stgit.dcs.gla.ac.uk';

export default definePlugin({
  name: 'stgit',
  props: {
    token: {},
    repolink: {},
  },
  async setup(resolvedOptions) {
    const { token, repolink } = resolvedOptions;
    const projectId: string = (repolink || 'asep/asep-coursework-2022').replace(
      `${HOST}/`,
      ''
    );

    const foxokit = new Gitlab({ host: HOST, token });

    const repoData = {
      commits: await foxokit.Commits.all(projectId),
      issues: await foxokit.Issues.all({ projectId }),
      pulls: await foxokit.MergeRequests.all({ projectId }),
      branches: await foxokit.Branches.all(projectId),
    };
    const { commits, issues, pulls, branches } = repoData;

    const commitsVerbose: (typeof commits[number] & {
      files: {
        filename: string;
        additions: number;
        deletions: number;
        changes: number;
      }[];
    })[] = [];
    const branchesVerbose: (typeof branches[number] & {
      stats: { ahead_by: number; behind_by: number }; // Awaited<ReturnType<typeof foxokit['Repositories']['compare']>>;
    })[] = [];
    const countDates: Record<
      'commits' | 'issues' | 'pulls',
      Array<Counter & { day: string }>
    > = { commits: [], issues: [], pulls: [] };

    const commitFiles: Array<
      Record<'changes' | 'additions' | 'deletions', number> & {
        filename: string;
        count: number;
      }
    > = [];

    const contributorData: Array<{
      username: string;
      totalCommits?: number;
      commitsCreated?: number;
      issuesCreated?: number;
      pullsCreated?: number;
    }> = [];

    const contributors = await foxokit.Repositories.contributors(projectId);

    contributorData.push(
      ...contributors.map(({ email: username, commits: totalCommits }) => ({
        username,
        totalCommits,
      }))
    );

    if (commits.length > 0)
      await Promise.all(
        branches.slice(0, 5).map(async (b) => {
          branchesVerbose.push({
            ...b,
            stats: {
              ahead_by:
                (
                  await foxokit.Repositories.compare(
                    projectId,
                    commits[0].id,
                    b.commit.id as string
                  )
                ).commits?.length || 0,
              behind_by: 0,
            },
          });
        })
      );

    (['issues', 'pulls'] as const).forEach((i) =>
      repoData[i].forEach(({ author, created_at: createdAt }) => {
        const dateobj = new Date(createdAt as string);
        const date = dateobj.toDateString();
        const dateIndex = countDates[i].findIndex((d) => d.date === date);

        if (dateIndex === -1) {
          countDates[i].push({
            date,
            count: 1,
            day: new Intl.DateTimeFormat('en-GB', {
              weekday: 'long',
            }).format(dateobj),
          });
        } else {
          countDates[i][dateIndex].count += 1;
        }

        if (!author) return;

        const userIdx = contributorData.findIndex(
          ({ username }) =>
            username === (author as typeof contributors[number]).email
        );

        if (userIdx === -1) {
          contributorData.push({
            username: (author as typeof contributors[number]).email,
            [`${i}Created`]: 1,
          });
        } else {
          contributorData[userIdx][`${i}Created`] =
            (contributorData[userIdx][`${i}Created`] || 0) + 1;
        }
      })
    );

    await Promise.all(
      commits.map(
        async ({ created_at: createdAt, author_email: author, id }, idx) => {
          if (createdAt) {
            const dateobj = new Date(createdAt);
            const date = dateobj.toDateString();
            const dateIndex = countDates.commits.findIndex(
              (d) => d.date === date
            );

            if (dateIndex === -1) {
              countDates.commits.push({
                date,
                count: 1,
                day: new Intl.DateTimeFormat('en-GB', {
                  weekday: 'long',
                }).format(dateobj),
              });
            } else {
              countDates.commits[dateIndex].count += 1;
            }
          }

          if (author) {
            const index = contributorData.findIndex(
              (d) => d.username === author
            );

            if (index === -1) {
              contributorData.push({
                username: author,
                commitsCreated: 1,
              });
            } else {
              contributorData[index].commitsCreated =
                (contributorData[index].commitsCreated || 0) + 1;
            }
          }

          const parseDiffObject = (
            diffObject: Awaited<
              ReturnType<typeof foxokit['Commits']['diff']>
            >[number]
          ) => {
            const diffLines = diffObject.diff.split('\n');
            let additions = 0;
            let deletions = 0;

            diffLines.forEach((line) => {
              if (line.startsWith('+')) {
                additions += 1;
              } else if (line.startsWith('-')) {
                deletions += 1;
              }
            });

            return {
              additions,
              deletions,
              changes: additions + deletions,
            };
          };

          const commitVerbose = {
            ...commits[idx],
            files: (await foxokit.Commits.diff(projectId, id)).map((i) => ({
              filename: i.new_path,
              ...parseDiffObject(i),
            })),
          };

          commitsVerbose.push(commitVerbose);

          commitVerbose.files?.forEach(
            ({ filename, changes, additions, deletions }) => {
              const index = commitFiles.findIndex(
                (f) => f.filename === filename
              );

              if (index === -1) {
                commitFiles.push({
                  filename,
                  changes,
                  additions,
                  deletions,
                  count: 1,
                });
              } else {
                commitFiles[index].count += 1;
                commitFiles[index].changes += changes;
                commitFiles[index].additions += additions;
                commitFiles[index].deletions += deletions;
              }
            }
          );
        }
      )
    );

    const datesLabels: string[] = [];

    Object.values(countDates)
      .flat()
      .forEach(({ date }) => {
        if (!datesLabels.includes(date)) {
          datesLabels.push(date);
        }
      });

    return {
      export: () => [
        { title: `${commits.length} Commits`, data: countDates.commits },
        {
          title: `${commitFiles
            .map(({ changes }) => changes)
            .reduce((a, b) => a + b)} Changes to Files`,
          data: commitFiles,
        },
        {
          title: `${contributorData.length} Contributors`,
          data: contributorData,
        },
      ],
      exportCharts() {
        return [
          {
            type: 'line',
            data: {
              labels: datesLabels.sort((a, b) => Date.parse(a) - Date.parse(b)),
              datasets: <
                {
                  label: string;
                  data: { x: any; y: number }[];
                  tension: number;
                }[]
              >Object.entries(countDates).map(([k, v]) => ({
                label: propercase(k),
                data: v.map(({ date: x, count: y }) => ({
                  x,
                  y,
                })),
                tension: 0.1,
              })),
            },
            // options: { scales: { x: { type: 'time' } } },
          },
          {
            type: 'radar',
            data: {
              labels: days,
              datasets: Object.entries(countDates).map(([k, v]) => ({
                label: propercase(k),
                data: v.reduce((acc, curr) => {
                  const index = days.indexOf(curr.day);
                  acc[index] += curr.count;
                  return acc;
                }, new Array(7).fill(0)),
              })),
            },
            options: {
              plugins: {
                // legend: { display: false },
                // title: { display: true, text: `${commits.length} Commits` },
              },
            },
          },
          {
            type: 'bar',
            data: {
              labels: contributorData.map(({ username }) => username),
              datasets: (['commits', 'issues', 'pulls'] as const).map((i) => ({
                label: propercase(i),
                data: contributorData.map((j) => j[`${i}Created`] || 0),
              })),
            },
            options: {
              plugins: {
                legend: { display: false },
                title: {
                  display: true,
                  text: `${contributorData.length} Contributors`,
                },
              },
              scales: { x: { stacked: true }, y: { stacked: true } },
            },
          },
          {
            type: 'bubble',
            data: {
              // <ChartData<'bubble',{ additions: number; deletions: number; count: number }[]>>
              labels: commitFiles.map(({ filename }) => filename),
              datasets: [
                {
                  label: 'Changes to Files',
                  data: commitFiles.map(
                    ({ count: r, additions: x, deletions: y }) => ({
                      x,
                      y,
                      r,
                    })
                  ),
                },
              ],
            },
            options: {
              parsing: {
                // xAxisKey: 'additions', yAxisKey: 'deletions', rAxisKey: 'count',
              },
              plugins: {
                legend: { display: false },
                title: {
                  display: true,
                  text: `${commitFiles
                    .map(({ changes }) => changes)
                    .reduce((a, b) => a + b)} Changes to Files`,
                },
              },
              scales: {
                x: {
                  title: { display: true, text: 'Additions' },
                  type: 'logarithmic',
                  // min: 5,
                },
                y: {
                  title: { display: true, text: 'Deletions' },
                  type: 'logarithmic',
                  // min: 5,
                },
                // r: { title: { display: true, text: 'Commits' } },
              },
            },
          },
          {
            type: 'bar',
            data: {
              labels: branchesVerbose.map((b) => b.name),
              datasets: [
                {
                  label: 'Ahead',
                  data: branchesVerbose.map((b) => b.stats.ahead_by),
                },
                {
                  label: 'Behind',
                  data: branchesVerbose.map((b) => b.stats.behind_by * -1),
                },
              ],
            },
            options: { indexAxis: 'y' },
          },
          {
            type: 'bar',
            data: {
              labels: [0, 1, 2, 3, 4], // needs working
              datasets: [
                {
                  label: 'Commits',
                  data: commits
                    .filter((i) => i.created_at)
                    .slice(0, 5)
                    .map((i) => [
                      Date.parse(i.created_at as unknown as string),
                      Date.parse(i.created_at as unknown as string),
                    ]),
                },
                ...(['issues', 'pulls'] as const).map((i) => ({
                  label: propercase(i),
                  data: (repoData[i] as typeof repoData.issues)
                    .filter((j) => j.closed_at && j.state === 'closed')
                    .slice(0, 5)
                    .map(
                      (j) =>
                        [
                          Date.parse(j.created_at as string),
                          Date.parse((j.closed_at as string) || ''),
                        ] as [number, number]
                    )
                    .filter(([a, b]) => a && b && b - a <= 5097600000),
                })),
              ],
            },
            options: {
              indexAxis: 'y',
              scales: {
                x: { beginAtZero: false }, // type: 'logarithmic' },
                y: { beginAtZero: false },
              },
            },
          },
        ];
      },
      raw: () => ({
        commits: commitsVerbose,
        issues,
        pulls,
        branches: branchesVerbose,
        contributors,
      }),
    };
  },
});
