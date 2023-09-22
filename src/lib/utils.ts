export const fromEntries = <
  T,
  U extends Iterable<readonly [PropertyKey, unknown]>
>(
  formData: U
): T => {
  const entity = Object.fromEntries(formData);
  return entity as unknown as T;
};
