import { readable } from 'svelte/store';
import { ghData, wtData } from './sample';

// eslint-disable-next-line import/prefer-default-export
export const plugins = readable<FitPlugin[]>([
  { id: 'github', name: 'GitHub', data: ghData },
  { id: 'wakatime', name: 'WakaTime', data: wtData },
]);
