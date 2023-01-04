export default eventHandler(async (event) => {
  const body = await readBody(event);
  await useStorage().setItem('test:foo', body);
  return {};
});
