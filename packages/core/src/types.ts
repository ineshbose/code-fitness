// import type { Ignore } from 'ignore';

// type Core = {
//   _version: string;
//   _ignore?: Ignore;
//   options: any;
// };

export type Config = {
  [k: string]: any;
  plugins?: [string, Record<string, any> | undefined][];
  charts?: boolean;
};
