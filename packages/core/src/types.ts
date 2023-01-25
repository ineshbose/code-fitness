import type { ChartConfigurationInstance } from 'chart.js';
import type Core from './tracker';

type PromiseLike<T> = T | Promise<T>;

export type PluginMeta = {
  name: string;
  [key: string]: any;
};

export type PluginOptions = Record<string, any>; // & { chart?: boolean }

export type PluginProps<T extends PluginOptions = PluginOptions> = Record<
  keyof T,
  {
    type?: 'string' /* | 'number' | 'boolean' */;
    required?: boolean;
    default?: any;
  }
>;

export type PluginInputs<T extends PluginProps = PluginProps> = {
  [P in keyof T as T[P]['required'] extends true ? never : P]?: any;
};

export type PluginExports = {
  export: () => PromiseLike<Array<{ title: string; data: Array<any> }>>;
  exportCharts?: () => PromiseLike<Array<ChartConfigurationInstance>>;
};

export type PluginSetup<T extends string | number | symbol = string> = (
  resolvedOptions: Record<T, any>,
  core: Core
) => PromiseLike<PluginExports>;

export type PluginDefinition<T extends PluginOptions = PluginOptions> =
  PluginMeta & {
    props: PluginProps<T>;
    setup: PluginSetup<keyof T>;
  };

export type PluginSetupMediator<T extends PluginOptions = PluginOptions> =
  () => PluginDefinition<T> & {
    setup: (
      inputs: PluginInputs<PluginProps<T>>,
      core: Core
    ) => PromiseLike<PluginExports>;
  };

export type PluginConfig =
  | string
  | [string, Record<string, any> | undefined]
  | PluginSetupMediator;
// | PluginSetup;
// | [string, PluginSetupMediator, Record<string, any> | undefined];

export type Config = {
  [k: string]: any;
  configPath?: string;
  plugins?: PluginConfig[]; // [string, Record<string, any> | undefined][];
  charts?: boolean;
};
