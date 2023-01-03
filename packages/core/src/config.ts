import consola from 'consola';
import { resolve } from 'path';
import { cosmiconfigSync } from 'cosmiconfig';

type Config = {
  [k: string]: unknown;
  plugins?: string[];
};

export const loadConfig = (configFilePath?: string) => {
  const explorer = cosmiconfigSync('codeFitness');
  const result = configFilePath
    ? explorer.load(configFilePath)
    : explorer.search();

  return result ? <Config>result.config : {};
};

export const loadPlugins = (config: Config) => {
  return Promise.all(
    config.plugins?.map((p) => {
      try {
        return import(resolve(`code-fitness-plugin-${p}`));
      } catch (e) {
        consola.error(`Error loading plugin "${p}": ${e}`);
        return process.exit(1);
      }
    }) || []
  );
};
