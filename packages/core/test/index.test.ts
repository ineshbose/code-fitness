import { expect, it, describe } from 'vitest';
import { name as pkgName } from '../package.json';

describe(pkgName, () => {
  [
    { input: 'foo', output: 'Hello foo' },
    { input: 'bar', output: 'Hello bar' },
  ].forEach((test) =>
    it(test.input, () => {
      expect(((name) => `Hello ${name}`)(test.input)).eq(test.output);
    })
  );
});
