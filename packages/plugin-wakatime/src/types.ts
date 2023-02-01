import type { Octokit } from 'octokit';
import type { OctokitResponse } from '@octokit/types';

export type Octo<
  X extends keyof Octokit['rest'],
  Y extends keyof Octokit['rest'][X]
> = Octokit['rest'][X][Y] extends infer O_
  ? O_ extends (...args: any) => any
    ? Awaited<ReturnType<O_>> extends infer OR_
      ? OR_ extends OctokitResponse<any>
        ? OR_['data']
        : never
      : never
    : never
  : never;
