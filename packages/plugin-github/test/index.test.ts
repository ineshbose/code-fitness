import { it, describe, vi } from 'vitest';
import CodeFitness from 'core';
import GitHubPlugin from '../src';

vi.mock('octokit', async () => {
  const Octokit = await import('./octokit.mock').then((m) => m.default || m);
  return { Octokit };
});

describe('code-fitness-plugin-github', () => {
  it('plugin', async () => {
    const tracker = new CodeFitness({
      plugins: [GitHubPlugin],
    });

    await tracker.init();

    // const output = await tracker.export();
  });
});
