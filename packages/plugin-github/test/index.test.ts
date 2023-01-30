import { it, describe, vi, expect } from 'vitest';
import CodeFitness from 'core';
import GitHubPlugin from '../src';
import result from './mocks/result.json';
import chartResult from './mocks/chartResult.json';

vi.mock('octokit', async () => {
  const Octokit = await import('./octokit.mock').then((m) => m.default || m);
  return { Octokit };
});

vi.mock('ofetch', async () => {
  let callNumber = 0;
  const svgs = (
    await import('./mocks/shields.txt?raw').then((m) => m.default || m)
  )
    .toString()
    .split('\n');

  // eslint-disable-next-line no-plusplus
  return { ofetch: () => svgs[callNumber++] };
});

describe('code-fitness-plugin-github', () => {
  it('plugin', async () => {
    const tracker = new CodeFitness({
      plugins: [GitHubPlugin],
    });

    await tracker.init();

    const output = await tracker.export();

    expect(output.length).toBe(1);
    expect(output[0].name).toBe('github');
    expect(output[0].data.length).toBe(3);
    expect(JSON.stringify(output[0].data)).toBe(JSON.stringify(result));
  });

  it('charts', async () => {
    const tracker = new CodeFitness({
      charts: true,
      plugins: [GitHubPlugin],
    });

    await tracker.init();

    const output = await tracker.export();

    expect(output.length).toBe(1);
    expect(output[0].name).toBe('github');
    expect(JSON.stringify(output[0].data)).toBe(JSON.stringify(chartResult));
  });
});
