import { sequenceT } from "fp-ts/es6/Apply";
import { option } from "fp-ts/es6/Option";

export const seqOptionT = sequenceT(option);
