import { sequenceT, sequenceS } from "fp-ts/es6/Apply";
import { some, none } from "fp-ts/es6/Option";
import { right } from "fp-ts/es6/Either";
import { identity, constant } from "fp-ts/es6/function";
import {
  datumEither,
  DatumEither,
  initial,
  squash,
  isRefresh,
  isSuccess,
} from "@nll/datum/DatumEither";
import { replete, refresh } from "@nll/datum/Datum";
import { Optional } from "monocle-ts";

import { notNil } from "./typeguards";

export const seqTDatumEither = sequenceT(datumEither);
export const seqSDatumEither = sequenceS(datumEither);

export const fromUndefined = <E, A>(
  de: DatumEither<E, A> | undefined
): DatumEither<E, A> => (notNil(de) ? de : initial);

export const getOrElse = <E, A>(a: A) =>
  squash<E, A, A>(constant(a), constant(a), identity);

export const datumEitherL = <E, A>() =>
  new Optional(
    (de: DatumEither<E, A>) => (isSuccess(de) ? some(de.value.right) : none),
    (v) => (de) => (isRefresh(de) ? refresh(right(v)) : replete(right(v)))
  );
