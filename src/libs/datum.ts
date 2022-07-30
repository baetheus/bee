import { sequenceS, sequenceT } from "fp-ts/Apply";
import { constant, identity } from "fp-ts/function";
import {
  DatumEither,
  datumEither,
  initial,
  squash,
} from "@nll/datum/DatumEither";

import { notNil } from "./typeguards";

export const seqTDatumEither = sequenceT(datumEither);
export const seqSDatumEither = sequenceS(datumEither);

export const fromUndefined = <E, A>(
  de: DatumEither<E, A> | undefined,
): DatumEither<E, A> => (notNil(de) ? de : initial);

export const getOrElse = <E, A>(a: A) =>
  squash<E, A, A>(constant(a), constant(a), identity);
