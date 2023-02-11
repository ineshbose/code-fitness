import { Octokit } from 'octokit';
import { definePlugin } from 'core';
import { getLists, getShields } from './utils';

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

export default definePlugin({
  name: 'github',
  props: {
    /**
     * I would love to implement authentication for GitHub (preferably
     * integrate with PR & Issues extension), but I'm on limited time
     * and also GitHub API is strict with rate limits (hence UNGH).
     */
    auth: {},
    repolink: {},
  },
  async setup(resolvedOptions) {
    const { auth, repolink } = resolvedOptions;
    const [owner = 'octocat', repo = 'Hello-World'] = (
      repolink || 'octocat/Hello-World'
    )
      .replace(/^https?:\/\/github\.com\//, '')
      .replace(/\.git$/, '')
      .split('/');

    const octokit = new Octokit({ auth });
    const ungh = new Octokit({ baseUrl: 'https://ungh.cc' });

    const repoData = await getLists(octokit, owner, repo);
    const { commits, issues, pulls, branches } = repoData;

    const commitsVerbose: typeof commits = [];
    const branchesVerbose: ((typeof branches)[number] & {
      stats: Awaited<
        ReturnType<Octokit['rest']['repos']['compareCommits']>
      >['data'];
    })[] = [];
    const countDates: Record<
      'commits' | 'issues' | 'pulls',
      Array<Counter & { day: string }>
    > = { commits: [], issues: [], pulls: [] };

    const commitFiles: Array<
      Pick<
        NonNullable<(typeof commits)[0]['files']>[0],
        'filename' | 'changes' | 'additions' | 'deletions'
      > & {
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

    const {
      data: { contributors },
    } = (await ungh.rest.repos.listContributors({
      owner,
      repo,
    })) as unknown as {
      data: {
        // | Awaited<ReturnType<typeof ungh.rest.repos.listContributors>>['data'];
        contributors: Array<{
          id: number;
          username: string;
          contributions: number;
        }>;
      };
    };

    contributorData.push(
      ...contributors.map(({ username, contributions: totalCommits }) => ({
        username,
        totalCommits,
      }))
    );

    if (commits.length > 0)
      await Promise.all(
        branches.slice(0, 5).map(async (b) => {
          branchesVerbose.push({
            ...b,
            stats: (
              await octokit.rest.repos.compareCommits({
                owner,
                repo,
                base: commits[0].sha,
                head: b.commit.sha,
              })
            ).data,
          });
        })
      );

    (['issues', 'pulls'] as const).forEach((i) =>
      repoData[i].forEach(({ user, created_at: createdAt }) => {
        const dateobj = new Date(createdAt);
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

        if (!user || !user.login) return;

        const userIdx = contributorData.findIndex(
          ({ username }) => username === user.login
        );

        if (userIdx === -1) {
          contributorData.push({ username: user.login, [`${i}Created`]: 1 });
        } else {
          contributorData[userIdx][`${i}Created`] =
            (contributorData[userIdx][`${i}Created`] || 0) + 1;
        }
      })
    );

    await Promise.all(
      commits.map(
        async ({ commit, sha: ref, files: rawFiles, author }, idx) => {
          if (commit.committer?.date) {
            const dateobj = new Date(commit.committer.date);
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
              (d) => d.username === author.login
            );

            if (index === -1) {
              contributorData.push({
                username: author.login,
                commitsCreated: 1,
              });
            } else {
              contributorData[index].commitsCreated =
                (contributorData[index].commitsCreated || 0) + 1;
            }
          }

          const commitVerbose = rawFiles
            ? commits[idx]
            : (await octokit.rest.repos.getCommit({ owner, repo, ref })).data;

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

    const shieldsIoData = await getShields(owner, repo); // can leverage repolink and response SVG
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
                    .filter((i) => i.commit.committer?.date)
                    .slice(0, 5)
                    .map((i) => [
                      Date.parse(i.commit.committer?.date || ''),
                      Date.parse(i.commit.committer?.date || ''),
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
                          Date.parse(j.created_at),
                          Date.parse(j.closed_at || ''),
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
        shieldsIoData,
      }),
    };
  },
});
