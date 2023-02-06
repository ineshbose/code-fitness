import commits from './mocks/commits.json';
import commit1 from './mocks/commit-fda7c9583471e8f6efe69f09670add642522d797.json';
import commit2 from './mocks/commit-96bc9101c3e6dc29f9b3346170da2b9640e69849.json';
import commit3 from './mocks/commit-9e2a2afaef5e207ddea0047aea6fbabc678eb4ae.json';
import commit4 from './mocks/commit-17f199fb76e59d40c28d0e43da83958bbd84fd6a.json';

export default class Gitlab {
  commitMap = {
    all: commits,
    fda7c9583471e8f6efe69f09670add642522d797: commit1,
    '96bc9101c3e6dc29f9b3346170da2b9640e69849': commit2,
    '9e2a2afaef5e207ddea0047aea6fbabc678eb4ae': commit3,
    '17f199fb76e59d40c28d0e43da83958bbd84fd6a': commit4,
  };

  Commits = {
    all: () => this.commitMap.all,
    diff: (id: keyof typeof this.Commits) => this.commitMap[id],
  };

  Issues = { all: () => import('./mocks/issues.json') };

  MergeRequests = {};

  Branches = { all: () => import('./mocks/branches.json') };

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  Repositories = { compare: (_, from, to) => {} };
}
