import { Octokit } from 'octokit';
import { definePlugin } from 'core';
import { getLists } from './utils';

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
      .split('/');

    const octokit = new Octokit({ auth });
    const ungh = new Octokit({ baseUrl: 'https://ungh.cc' });

    const { commits } = await getLists(octokit, owner, repo);

    const commitDates: Array<{ date: string; count: number }> = [];
    const commitFiles: Array<
      Pick<
        NonNullable<typeof commits[0]['files']>[0],
        'filename' | 'changes' | 'additions' | 'deletions'
      > & {
        count: number;
      }
    > = [];

    await Promise.all(
      commits.map(async ({ commit, sha: ref, files: rawFiles }) => {
        if (commit.committer?.date) {
          const date = new Intl.DateTimeFormat('en-GB', {
            weekday: 'long',
          }).format(new Date(commit.committer.date));
          const index = commitDates.findIndex((d) => d.date === date);

          if (index === -1) {
            commitDates.push({ date, count: 1 });
          } else {
            commitDates[index].count += 1;
          }
        }

        const files =
          rawFiles ||
          (await octokit.rest.repos.getCommit({ owner, repo, ref })).data.files;

        files?.forEach(({ filename, changes, additions, deletions }) => {
          const index = commitFiles.findIndex((f) => f.filename === filename);

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
        });
      })
    );

    const {
      data: { contributors },
    } = (await ungh.rest.repos.listContributors({
      owner,
      repo,
    })) as unknown as {
      data: {
        contributors: Array<{
          id: number;
          username: string;
          contributions: number;
        }>;
        // | Awaited<
        //     ReturnType<typeof ungh.rest.repos.listContributors>
        //   >['data'];
      };
    };

    // const shieldsIoData = await getShields(owner, repo); // can leverage repolink and response SVG

    return {
      export: () => [
        { title: `${commits.length} Commits`, data: commitDates },
        {
          title: `${commitFiles
            .map(({ changes }) => changes)
            .reduce((a, b) => a + b)} Changes to Files`,
          data: commitFiles,
        },
        {
          title: `${contributors
            .map(({ contributions }) => contributions)
            .reduce((a, b) => a + b)} Contributions`,
          data: contributors,
        },
      ],
      exportCharts() {
        return [
          {
            type: 'radar',
            data: {
              labels: commitDates.map(({ date }) => date),
              datasets: [
                {
                  label: 'Commits',
                  data: commitDates.map(({ count }) => count),
                },
              ],
            },
            options: {
              plugins: {
                legend: { display: false },
                title: { display: true, text: `${commits.length} Commits` },
              },
            },
          },
          {
            type: 'bubble',
            data: {
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
                x: { title: { display: true, text: 'Additions' } },
                y: { title: { display: true, text: 'Deletions' } },
                // r: { title: { display: true, text: 'Commits' } },
              },
            },
          },
          {
            type: 'bar',
            data: {
              labels: contributors.map(({ username }) => username),
              datasets: [
                {
                  label: 'Contributions',
                  data: contributors.map(({ contributions }) => contributions),
                },
              ],
            },
            options: {
              plugins: {
                legend: { display: false },
                title: {
                  display: true,
                  text: `${contributors
                    .map(({ contributions }) => contributions)
                    .reduce((a, b) => a + b)} Contributions`,
                },
              },
            },
          },
        ];
      },
    };
  },
});
