"use client";

import useFun from "./useFun";
import { useId } from "react";

let observer: IntersectionObserver;

const store = new WeakMap();
const cache = new Map();

function observe(entries: IntersectionObserverEntry[]) {
  entries.forEach((entry) => {
    const { target } = entry;
    if (!store.has(target)) return;
    store.get(target)(entry);
    entry.isIntersecting
  });
}

function createRef(fun: Function) {
  return <El extends HTMLElement>(el: El | null) => {
    if (!el) return; // ignore if cleanup phase
    if (!observer) observer = new IntersectionObserver(observe);
    store.set(el, fun);
    observer.observe(el);
  };
}

type Callback = (entry: IntersectionObserverEntry) => void;

export default function useIntersect(fun: Callback) {
  const id = useId();
  const _fun = useFun(fun);

  if (!cache.has(id)) cache.set(id, createRef(_fun));
  return cache.get(id);
}
