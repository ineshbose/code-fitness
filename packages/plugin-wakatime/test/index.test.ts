import { it, describe, vi } from 'vitest';
import CodeFitness from 'core';
import WakaTimePlugin from '../src';
import GitHubPlugin from '../../plugin-github/src';

vi.mock('ofetch', async () => {
  function ofetch() {
    return 200;
  }

  const props = await import('./ofetch.mock').then((m) => m.default || m);
  ofetch.create = props.create;

  return { ofetch };
});

vi.mock('octokit', async () => {
  const Octokit = await import('../../plugin-github/test/octokit.mock').then(
    (m) => m.default || m
  );
  return { Octokit };
});

describe('code-fitness-plugin-wakatime', () => {
  it('plugin', async () => {
    const tracker = new CodeFitness({
      plugins: [WakaTimePlugin],
    });

    await tracker.init();

    // const output = await tracker.export();
  });

  it('github integration', async () => {
    const tracker = new CodeFitness({
      plugins: [GitHubPlugin, WakaTimePlugin],
    });

    await tracker.init();

    // const output = await tracker.export();
  });
});
