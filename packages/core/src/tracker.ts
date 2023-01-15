import { loadConfig, loadPlugins } from './config';
import type { Config } from './types';

export default class CodeFitness {
  plugins: Record<string, any>;

  config: Config;

  constructor() {
    this.plugins = {};
    this.config = {};
  }

  async init() {
    this.config = loadConfig();
    const pluginsArr = await loadPlugins(this.config);

    pluginsArr.forEach(([name, options, setup]) => {
      this.plugins[name] = setup(options, this);
    });
  }
}
