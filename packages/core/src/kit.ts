import defu from 'defu';
import type {
  PluginDefinition,
  PluginOptions,
  PluginSetupMediator,
} from './types';

// eslint-disable-next-line import/prefer-default-export
export const definePlugin = <T extends PluginOptions>(
  schema: PluginDefinition<T>
): PluginSetupMediator<T> => {
  const defaultOptions = <Record<keyof T, any>>{};
  Object.entries(schema.props).forEach(([k, v]) => {
    defaultOptions[k as keyof T] = v.default;
  });

  return () => ({
    ...schema,
    setup: (inputs, core) =>
      schema.setup(<T>defu(inputs, defaultOptions), core),
  });
};
