import { it, describe, vi, expect } from 'vitest';
import CodeFitness from 'core';
import StGitPlugin from '../src';
import result from './mocks/result.json';
import chartResult from './mocks/chartResult.json';

vi.mock('@gitbeaker/browser', () => import('@gitbeaker/node'));

describe('code-fitness-plugin-wakatime', () => {
  it('plugin', async () => {
    const tracker = new CodeFitness({
      plugins: [StGitPlugin],
    });

    await tracker.init();

    const output = await tracker.export();

    expect(output.length).toBe(1);
    expect(output[0].name).toBe('stgit');
    expect(JSON.stringify(output[0].data)).toBe(JSON.stringify(result));
  });

  it('charts', async () => {
    const tracker = new CodeFitness({
      charts: true,
      plugins: [StGitPlugin],
    });

    await tracker.init();

    const output = await tracker.export();

    expect(output.length).toBe(1);
    expect(JSON.stringify(output[0].data)).toBe(JSON.stringify(chartResult));
  });
});
