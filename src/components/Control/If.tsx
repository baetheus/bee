import { h, FunctionalComponent, Fragment, ComponentChildren } from "preact";

import { Fn } from "../../libs/types";

interface IfProps {
  predicate: boolean | Fn<[], boolean>;
  children: () => ComponentChildren;
}

export const If: FunctionalComponent<IfProps> = ({ predicate, children }) => {
  const render = typeof predicate === "function" ? predicate() : predicate;
  if (render) {
    return <Fragment>{children()}</Fragment>;
  }
  return null;
};
