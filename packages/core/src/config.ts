import consola from 'consola';
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
      // plugin is passed as a(n imported) function
      if (typeof p === 'function') {
        const { name, setup } = p();
        return [name || `plugin-${idx}`, {}, setup] as const;
      }

      // else it is passed as a string or [string, options]
      const [name, options = {}] = Array.isArray(p) ? p : [p];

      try {
        const plugin = (await import(
          `code-fitness-plugin-${name}`
        )) as PluginSetupMediator;

        const { name: pName, setup } = plugin();

        return [pName || name, options, setup] as const;
      } catch (e) {
        consola.error(`Error loading plugin "${name}": ${e}`);

        return process.exit(1);
      }
    }) || []
  );
};
