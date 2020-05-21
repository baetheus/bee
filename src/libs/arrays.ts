export function shuffle<T>(ts: T[]): T[] {
  const array = [...ts];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export const split = <T>(ts: ReadonlyArray<T>): [T[], T[]] => {
  const front: T[] = [];
  const back: T[] = [];
  const middle = Math.floor(ts.length / 2);
  ts.forEach((t, i) => (i < middle ? front.push(t) : back.push(t)));
  return [front, back];
};

export const chunk = <T>(ts: ReadonlyArray<T>, chunkSize: number): T[][] => {
  if (chunkSize === 0) {
    return [[...ts]];
  }

  const result: T[][] = [];
  for (let i = 0, len = ts.length; i < len; i += chunkSize) {
    result.push(ts.slice(i, i + chunkSize));
  }
  return result;
};

export const range = (count: number, start: number = 0, step: number = 1) => {
  const _count = Math.floor(Math.abs(count));
  return Array.from({ length: _count }, (_, i) => start + i * step);
};

export const zip = <A, B>(as: A[], bs: B[]): (A & B)[] => {
  let result: (A & B)[] = [];
  for (let i = 0; i < Math.max(as.length, bs.length); i++) {
    result.push(Object.assign({}, as[i], bs[i]));
  }
  return result;
};

function onlyUnique<A>(value: A, index: number, self: A[]) {
  return self.indexOf(value) === index;
}

export const merge = <A>(as: A[], bs: A[]): A[] =>
  as.concat(bs).filter(onlyUnique);
