import { writable } from 'svelte/store';
import type { FitPlugin } from './app';

export const plugins = writable<FitPlugin[]>([]);
export const addPlugin = (p: FitPlugin) => plugins.update((n) => [p, ...n]);
