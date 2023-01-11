// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  // interface Error {}
  // interface Locals {}
  // interface PageData {}
  // interface Platform {}
}

type FitPlugin = {
  id: string;
  name: string;
  data?: Array<import('chart.js').ChartConfigurationInstance>;
  open?: boolean;
};
