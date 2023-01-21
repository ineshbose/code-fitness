import defu from 'defu';
import { camelCase } from 'scule';
import { loadConfig, loadPlugins } from './config';
import type { Config, PluginExports } from './types';

export default class CodeFitness {
  plugins: Record<string, PluginExports>;

  config: Config;

  documentOptions: [string, any][];

  constructor(config?: Config) {
    this.plugins = {};
    this.config = config || loadConfig();
    this.documentOptions = Object.entries(
      document ? { ...document.body.dataset } : {}
    );

    if (this.config.configPath) {
      this.config = defu(config, loadConfig(this.config.configPath));
    }
  }

  async init() {
    const pluginsArr = await loadPlugins(this.config);

    await Promise.all(
      pluginsArr.map(async ([name, options, setup]) => {
        this.plugins[name] = await setup(
          {
            ...Object.fromEntries(
              this.documentOptions.flatMap(([k, v]) =>
                k.startsWith(name) ? [[camelCase(k.replace(name, '')), v]] : []
              )
            ),
            ...options,
          },
          this
        );
      })
    );
  }

  export() {
    return Object.entries(this.plugins).map(([name, fn]) => ({
      name,
      data: this.config.charts ? (fn.exportCharts || fn.export)() : fn.export(),
    }));
  }
}
