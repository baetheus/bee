import { h, VNode, Fragment } from "preact";

type Mappable<T> = Array<T> | Record<string, T>;

interface MapProps<T> {
  items: Mappable<T>;
  filter?: (item: T) => boolean;
  children: (item: T, index: number) => VNode<any> | null;
}

export const Map = <T, _>({ items, filter: f, children }: MapProps<T>) => {
  let list = Array.isArray(items)
    ? items
    : Object.keys(items)
        .sort()
        .map((k) => items[k]);
  let filtered = typeof f === "function" ? list.filter(f) : list;

  return <Fragment>{filtered.map(children)}</Fragment>;
};
