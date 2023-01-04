export default defineEventHandler(async (event) => {
  const pass = 'true'; // dev TODO

  return getQuery(event).pass === pass
    ? (await useStorage().getItem('test:foo')) || 204
    : 403;
});
