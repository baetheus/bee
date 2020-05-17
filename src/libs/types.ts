export type Fn<AS extends any[], R> = (...as: AS) => R;
export type FromFn<F> = F extends Fn<infer AS, infer R> ? [AS, R] : never;
