import defu from 'defu';
import { camelCase } from 'scule';
import { loadConfig, loadPlugins } from './config';
import type { Config, PluginExports } from './types';

export default class CodeFitness {
  plugins: Record<string, PluginExports>;

  config: Config;

  documentOptions: [string, any][];

  datetime: Date;

  constructor(config?: Config) {
    this.plugins = {};
    this.config = config || loadConfig();
    this.documentOptions = Object.entries(
      typeof document === 'undefined' ? {} : { ...document.body.dataset }
    );

    if (this.config.configPath) {
      this.config = defu(config, loadConfig(this.config.configPath));
    }

    this.datetime = new Date();
  }

  async init() {
    const pluginsArr = await loadPlugins(this.config);

    await pluginsArr.reduce(
      (p, [name, options, setup]) =>
        p.then(async () => {
          this.plugins[name] = await setup(
            {
              ...Object.fromEntries(
                this.documentOptions.flatMap(([k, v]) =>
                  k.startsWith(name)
                    ? [[camelCase(k.replace(name, '')), v]]
                    : []
                )
              ),
              ...options,
            },
            this
          );
        }),
      Promise.resolve()
    );
  }

  async export() {
    return Promise.all(
      Object.entries(this.plugins).map(async ([name, fn]) => ({
        name,
        data: await (this.config.charts
          ? (fn.exportCharts || fn.export)()
          : fn.export()),
      }))
    );
  }

  getExport(name: string) {
    return this.plugins[name].export();
  }
}
