import { useId } from "react";

const store = new Map();
const cache = new Map();

export default function useFun<F extends Function>(fun: F) {
  const id = useId();

  store.set(id, fun);

  if (!cache.has(id))
    cache.set(id, (...args: unknown[]) => store.get(id)(...args));

  return cache.get(id) as F;
}
