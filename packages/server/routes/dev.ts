export default defineEventHandler(async (event) => {
  const pass = process.env.DEV_PASS;

  return getQuery(event).pass === pass
    ? (await useStorage().getItem('db:foo')) || 204
    : 403;
});
