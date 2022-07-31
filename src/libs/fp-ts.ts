import { sequenceT } from "fp-ts/Apply";
import { option } from "fp-ts/Option";

export const seqOptionT = sequenceT(option);
