/**
 * This is a proxy endpoint for WakaTime API.
 *
 * It is ONLY being used for the research evaluation
 * and would be disabled right after.
 *
 * WakaTime has every right to blocklist the server
 * on excessive/non-research use. Help a uni-student out!
 */
import { wakaFetch } from '~/utils';

export default eventHandler((event) =>
  wakaFetch(event.context.params.slug, getQuery(event))
);
