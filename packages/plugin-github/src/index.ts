import { Octokit } from 'octokit';
import { definePlugin } from 'core';

export default definePlugin({
  name: 'github-plugin',
  props: { auth: {}, repolink: {} },
  async setup(resolvedOptions) {
    const { auth, repolink } = resolvedOptions;
    const [owner, repo] = (repolink || '')
      .replace(/^https?:\/\/github\.com\//, '')
      .split('/');
    const octokit = new Octokit({ auth });

    const commits = await octokit.rest.repos.listCommits({ owner, repo });

    return {
      export() {
        return [{ title: 'Commits', data: commits.data }];
      },
    };
  },
});
