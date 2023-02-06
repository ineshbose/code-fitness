import type { $Fetch } from 'ofetch';

export default <$Fetch | Record<string, any>>{
  create: () => (p: string) =>
    p === '/summaries'
      ? import('./mocks/sampleSummary.json')
      : import('./mocks/status.json'),
};
