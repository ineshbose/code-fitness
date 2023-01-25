import type { $Fetch } from 'ofetch';

export default <$Fetch | Record<string, any>>{
  create: () => () => import('./mocks/status.json'),
};
