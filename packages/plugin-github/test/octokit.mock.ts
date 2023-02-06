import type { Octokit as RealOctokit } from 'octokit';
import commits from './mocks/commits.json';
import commit1 from './mocks/commit-553c2077f0edc3d5dc5d17262f6aa498e69d6f8e.json';
import commit2 from './mocks/commit-762941318ee16e59dabbacb1b4049eec22f0d303.json';
import commit3 from './mocks/commit-7fd1a60b01f91b314f59955a4e4d4e80d8edf11d.json';

export default class Octokit {
  commitMap = {
    all: commits,
    '553c2077f0edc3d5dc5d17262f6aa498e69d6f8e': commit1,
    '762941318ee16e59dabbacb1b4049eec22f0d303': commit2,
    '7fd1a60b01f91b314f59955a4e4d4e80d8edf11d': commit3,
  };

  rest = <RealOctokit['rest'] | Record<string, any>>{
    repos: {
      listCommits: () => ({ data: this.commitMap.all }),
      getCommit: ({ ref }: any) => ({ data: this.commitMap[ref] }),
      listContributors: async () => ({
        data: await import('./mocks/contributors.json').then(
          (m) => m.default || m
        ),
      }),
      compareCommits: () => ({
        data: { stats: { ahead_by: 5, behind_by: 5 } },
      }),
      listBranches: async () => ({
        data: await import('./mocks/branches.json').then((m) => m.default || m),
      }),
    },
    issues: {
      listForRepo: async () => ({
        data: await import('./mocks/issues.json').then((m) => m.default || m),
      }),
    },
    pulls: {
      list: async () => ({
        data: await import('./mocks/pulls.json').then((m) => m.default || m),
      }),
    },
  };

  // eslint-disable-next-line class-methods-use-this
  request = async () => ({
    data: await import('./mocks/files.json').then((m) => m.default || m),
  });
}
