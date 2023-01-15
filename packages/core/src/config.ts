import consola from 'consola';
import { resolve } from 'path';
import { cosmiconfigSync } from 'cosmiconfig';
import type { Config } from './types';
import { definePlugin } from './kit';

export const loadConfig = (configFilePath?: string) => {
  const explorer = cosmiconfigSync('codeFitness');
  const result = configFilePath
    ? explorer.load(configFilePath)
    : explorer.search();

  return result ? <Config>result.config : {};
};

export const loadPlugins = (config: Config) => {
  return Promise.all(
    config.plugins?.map(async ([name, options = {}]) => {
      try {
        const plugin = (await import(
          resolve(`code-fitness-plugin-${name}`)
        )) as ReturnType<typeof definePlugin>;
        return [name, options, plugin] as const;
      } catch (e) {
        consola.error(`Error loading plugin "${name}": ${e}`);
        return process.exit(1);
      }
    }) || []
  );
};
