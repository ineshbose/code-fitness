import defu from 'defu';
import type { ChartConfigurationInstance } from 'chart.js';

type PluginMeta = {
  name: string;
  [key: string]: any;
};

type PluginOptions = Record<string, any>; // & { chart?: boolean }

type PluginProps<T extends PluginOptions = PluginOptions> = Record<
  keyof T,
  {
    type?: 'string' /* | 'number' | 'boolean' */;
    required?: boolean;
    default?: any;
  }
>;

type PluginInputs<T extends PluginProps = PluginProps> = {
  [P in keyof T as T[P]['required'] extends true ? never : P]?: any;
};

type PluginExports = {
  export: () => Array<{ title: string; data: Array<any> }>;
  exportCharts?: () => Array<ChartConfigurationInstance>;
};

export type PluginDefinition<T extends PluginOptions = PluginOptions> =
  PluginMeta & {
    props: PluginProps<T>;
    setup: (
      resolvedOptions: Record<keyof T, any>,
      core: any
    ) => PluginExports | Promise<PluginExports>;
  };

export const definePlugin = <T extends PluginOptions>(
  schema: PluginDefinition<T>
) => {
  const defaultOptions = <Record<keyof T, any>>{};
  Object.entries(schema.props).forEach(([k, v]) => {
    defaultOptions[k as keyof T] = v.default;
  });

  return (inputs: PluginInputs<typeof schema['props']>, core: any) =>
    schema.setup(<T>defu(inputs, defaultOptions), core);
};
