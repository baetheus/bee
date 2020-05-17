import * as G from "io-ts/es6/Guard";
import { MetaReducer } from "@nll/dux/Store";

const ErrorAction = G.type({
  error: G.literal(true),
});

const HasErrorMessage = G.type({
  value: G.type({
    error: G.string,
  }),
});

export const logger = <S>(): MetaReducer<S> => (reducer) => {
  return (state, action) => {
    const _state = reducer(state, action);

    console.groupCollapsed(action.type);
    if (ErrorAction.is(action)) {
      if (HasErrorMessage.is(action)) {
        console.error(action.value.error);
      }
      console.log("Error Action", action);
    } else {
      console.log("Action", action);
    }
    console.log("State Before", state);
    console.log("State After", _state);
    console.groupEnd();

    return _state;
  };
};
