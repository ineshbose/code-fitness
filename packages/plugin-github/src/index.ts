/* eslint-disable @typescript-eslint/no-unused-vars */
import { Octokit } from 'octokit';
import { definePlugin } from 'core';

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

    const { data: commits } = await octokit.rest.repos.listCommits({
      owner,
      repo,
    });

    const fileHeatMap: Record<string, any> = {};

    const {
      data: { files },
    } = (await ungh
      .request('GET /repos/{owner}/{repo}/files', { owner, repo })
      .catch(() =>
        ungh.request('GET /repos/{owner}/{repo}/files/master', { owner, repo })
      )) as {
      data: {
        files: Awaited<ReturnType<typeof ungh.rest.repos.getContent>>['data'];
      };
    };

    commits.slice(0, 10).forEach(async (c) => {
      const { data: commit } = await octokit.rest.repos.getCommit({
        owner,
        repo,
        ref: c.sha,
      });
      const { stats } = commit;
      commit.files?.forEach((f) => {
        fileHeatMap[f.filename] = commit.commit.committer?.date;
      });
    });

    const { data: contributors } = await ungh.rest.repos.listContributors({
      owner,
      repo,
    });

    const shieldsIoData = []; // can leverage repolink and response SVG

    return {
      export: () => [{ title: 'Commits', data: commits }],
      exportCharts() {
        return [];
      },
    };
  },
});
