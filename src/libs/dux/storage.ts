import * as C from "io-ts/es6/Codec";
import * as E from "fp-ts/es6/Either";
import { draw } from "io-ts/es6/Tree";
import { pipe } from "fp-ts/es6/pipeable";
import { Reducer, caseFn } from "@nll/dux/Reducers";
import {
  actionCreatorFactory,
  AsyncActionCreators,
  ActionCreator,
} from "@nll/dux/Actions";
import { asyncConcatMap } from "@nll/dux/Operators";
import { RunOnce, filterEvery, RunEvery, Store } from "@nll/dux/Store";
import { of, Observable, throwError, interval } from "rxjs";
import { mergeMap, map } from "rxjs/operators";

import { notNil } from "../typeguards";

const trySetState = <A>(codec: C.Codec<A>, key: string) => (s: A) =>
  E.tryCatch(
    () => {
      const encoded = codec.encode(s);
      window.localStorage.setItem(key, JSON.stringify(encoded));
      return encoded;
    },
    () => `Failed to set state at localStorage key ${key}`
  );

const tryGetState = (key: string) =>
  E.tryCatch(
    () => window.localStorage.getItem(key),
    (_) => "Failed to get state from localStorage"
  );

const tryCheckNull = (s: string | null) =>
  notNil(s) ? E.right(s) : E.left(`Returned state was ${s}`);

const tryParse = (s: string) =>
  E.tryCatch(
    (): unknown => JSON.parse(s),
    (_) => "Failed to parse json"
  );

const tryDecode = <S>(codec: C.Codec<S>) => (s: unknown) =>
  pipe(codec.decode(s), E.mapLeft(draw));

const throwLeft = <E, A>(obs: Observable<E.Either<E, A>>) =>
  obs.pipe(mergeMap((v) => (E.isLeft(v) ? throwError(v.left) : of(v.right))));

type StorageAction<A> = AsyncActionCreators<string, A, string>;

const getStateFactory = <A, B extends A>(
  codec: C.Codec<A>,
  getStateActions: StorageAction<A>
): RunOnce<B> =>
  asyncConcatMap(getStateActions, (key) =>
    of(
      pipe(
        tryGetState(key),
        E.chain(tryCheckNull),
        E.chain(tryParse),
        E.chain(tryDecode(codec))
      )
    ).pipe(throwLeft)
  );

const setStateFactory = <A, B extends A>(
  codec: C.Codec<A>,
  setStateActions: StorageAction<unknown>
): RunEvery<B> =>
  filterEvery(setStateActions.pending, (state, { value: params }) => {
    const result = trySetState(codec, params)(state);
    if (E.isLeft(result)) {
      return setStateActions.failure({ error: result.left, params });
    }
    return setStateActions.success({ result: result.right, params });
  });

const intervalFactory = <A>({ pending }: StorageAction<unknown>) => (
  key: string,
  period: number
): RunOnce<A> => () => interval(period).pipe(map(() => pending(key)));

const actionMapFactory = (
  setState: ActionCreator<string>,
  key: string,
  creators: ActionCreator<any>[]
): RunEvery<any> => (_, action) => {
  if (creators.some((c) => c.match(action))) {
    return setState(key);
  }
};

const setStateCaseFactory = <A, B extends A>({
  success,
}: StorageAction<A>): Reducer<B> =>
  caseFn(success, (state: B, { value: { result } }) => ({
    ...state,
    ...result,
  }));

/**
 * Creates reducers and actions for encoding/decoding parts of store to localstorage.
 *
 * @example
 * import { createStore } from '@nll/dux/Store';
 * import { caseFn } from '@nll/dux/Reducers';
 * import * as C from 'io-ts/es6/Codec'
 *
 * type State = { count: number };
 * const StateCodec = C.type({ count: C.number });
 *
 * const store = createStore({ count: 0 });
 *
 * const { wireup } = createStateRestore<StateCodec, State>(StateCodec, "COUNT_STATE");
 * wireup(store, 30 * 1000);
 */
export const createStateRestore = <A, B extends A>(
  codec: C.Codec<A>,
  key: string
) => {
  const creator = actionCreatorFactory(key);

  // Set State
  const setState = creator.async<string, unknown, string>("SET_STATE");
  const setStateRunEvery = setStateFactory<A, B>(codec, setState);

  // Get State
  const getState = creator.async<string, A, string>("GET_STATE");
  const getStateCase = setStateCaseFactory<A, B>(getState);
  const getStateRunOnce = getStateFactory<A, B>(codec, getState);

  // Set State on Interval
  const intervalRunOnce = intervalFactory(setState);

  // Wireup Store With Interval
  const wireupInterval = (store: Store<B>, period = 5 * 1000): Store<B> => {
    store
      .addReducers(getStateCase)
      .addRunEverys(setStateRunEvery)
      .addRunOnces(getStateRunOnce, intervalRunOnce(key, period))
      .dispatch(getState.pending(key));

    return store;
  };

  // Wireup Store With Actions
  const wireupActions = (
    store: Store<B>,
    actions: ActionCreator<any>[]
  ): Store<B> => {
    store
      .addReducers(getStateCase)
      .addRunEverys(
        setStateRunEvery,
        actionMapFactory(setState.pending, key, actions)
      )
      .addRunOnces(getStateRunOnce)
      .dispatch(getState.pending(key));

    return store;
  };

  return {
    setState,
    setStateRunEvery,
    getState,
    getStateCase,
    getStateRunOnce,
    intervalRunOnce,
    wireupInterval,
    wireupActions,
  };
};
