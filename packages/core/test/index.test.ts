import { join } from 'path';
import { expect, it, describe } from 'vitest';
import { name as pkgName } from '../package.json';
import CodeFitness, { definePlugin } from '../src';

describe(pkgName, () => {
  it('config reader', () => {
    const tracker = new CodeFitness({
      configPath: join(__dirname, 'test-fit.config.cjs'),
    });

    expect(tracker.config.plugins?.length).toBe(2);
    expect(tracker.config.charts).toBe(false);
  });

  it('plugin system', async () => {
    const plugin = definePlugin({
      name: 'Test plugin',
      props: {},
      setup: () => ({
        export: () => [
          { title: 'First', data: [123] },
          { title: 'Second', data: [456, 789] },
        ],
      }),
    });

    const tracker = new CodeFitness({
      plugins: [plugin],
    });
    await tracker.init();

    const output = await tracker.export();

    expect(JSON.stringify(output)).toBe(
      JSON.stringify([
        {
          name: 'Test plugin',
          data: [
            { title: 'First', data: [123] },
            { title: 'Second', data: [456, 789] },
          ],
        },
      ])
    );
  });
});
