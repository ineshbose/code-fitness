import consola from 'consola';
import { resolve } from 'path';
import { cosmiconfigSync } from 'cosmiconfig';
import type { Config, PluginSetupMediator } from './types';

export const loadConfig = (configFilePath?: string) => {
  const explorer = cosmiconfigSync('codeFitness');
  const result = configFilePath
    ? explorer.load(configFilePath)
    : explorer.search();

  return result ? <Config>result.config : {};
};

export const loadPlugins = (config: Config) => {
  return Promise.all(
    config.plugins?.map(async (p, idx) => {
      if (typeof p === 'function') {
        return [`plugin-${idx}`, {}, p] as const;
      }

      const [name, options = {}] = Array.isArray(p) ? p : [p];

      try {
        const plugin = (await import(
          resolve(`code-fitness-plugin-${name}`)
        )) as PluginSetupMediator;

        return [name, options, plugin] as const;
      } catch (e) {
        consola.error(`Error loading plugin "${name}": ${e}`);

        return process.exit(1);
      }
    }) || []
  );
};
