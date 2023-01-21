export default eventHandler(async (event) => {
  const body = await readBody(event);
  const existingData = await useStorage().setItem('db:foo');
  await useStorage().setItem(
    'db:foo',
    (Array.isArray(existingData) ? existingData : [existingData || {}]).concat(
      body
    )
  );
  return {};
});
