import { Decoder } from "io-ts/Decoder";
import { drawTree } from "fp-ts/Tree";
import { map } from "rxjs/operators";
import * as E from "fp-ts/Either";
import { Observable, of, throwError } from "rxjs";
import { mergeMap } from "rxjs/operators";

/**
 * @name toObservable
 * @description Takes an Either<L, R> and returns either an observable with
 * the error channel containing the L type or a new observable with the R type
 */
export const toObservable = <L, R>(e: E.Either<L, R>): Observable<R> =>
  E.fold<L, R, Observable<R>>(throwError, of)(e);

/**
 * @name fromEither
 * @description An observable operator that take an observable of Either<L, R>s
 * and returns an observable with the Either unwrapped, the L types in the error
 * channel and the R types in the next channel.
 */
export const fromEither = <L, R>(
  obs: Observable<E.Either<L, R>>,
): Observable<R> => obs.pipe(mergeMap(toObservable));

/**
 * @name mapDecode
 * @description A pipeable observable operator factory that takes an io-ts decoder
 * and returns a pipeable operator that decodes the
 */
export const mapDecode =
  <A>({ decode }: Decoder<A>) => (obs: Observable<unknown>): Observable<A> =>
    obs.pipe(
      map((u) => (typeof u === "string" ? JSON.parse(u) : u)),
      map(decode),
      map(E.mapLeft(drawTree)),
      fromEither,
    );
