import { it, describe, vi } from 'vitest';
import CodeFitness from 'core';
import WakaTimePlugin from '../src';

vi.mock('ofetch', async () => {
  const ofetch = await import('./ofetch.mock').then((m) => m.default || m);
  return { ofetch };
});

describe('code-fitness-plugin-github', () => {
  it('plugin', async () => {
    const tracker = new CodeFitness({
      plugins: [WakaTimePlugin],
    });

    await tracker.init();

    // const output = await tracker.export();
  });
});