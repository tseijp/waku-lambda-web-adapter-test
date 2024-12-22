"use client"

import React, { useMemo, useSyncExternalStore } from "react";
import useFun from "./useFun";
import useIntersect from "./useIntersect";

type InfiniteAction = (
  token?: string | null,
  ...args: any[]
) => Promise<readonly [element: React.ReactNode, nextToken?: string | null]>;

function createInfinite(action: InfiniteAction, token: string | null = null) {
  let components = [] as React.ReactNode;
  let update = () => {}

  const fun = ({ isIntersecting }: IntersectionObserverEntry) => {
    if (!isIntersecting) return; // ignore if not visible
    if (!token) return; // ignore if no token
  };

  const sub = (_update = () => {}) => {
    update = _update;
    return () => {};
  }

  const get = () => components;

  return { fun, sub, get };
}

export default function useInfinite(
  action: InfiniteAction,
  token: string | null = null
) {
  const inf = useMemo(() => createInfinite(action, token), []);
  const fun = useFun(inf.fun);
  const ref = useIntersect(fun);
  const ret = useSyncExternalStore(inf.sub, inf.get, inf.get);
  return [ret, ref];
}
