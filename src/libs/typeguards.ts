export const notNil = <T>(t: T): t is NonNullable<T> =>
  t !== undefined && t !== null;
