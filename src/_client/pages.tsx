"use client";

import Button from "./atoms/Button";
import Dropdown from "./atoms/Dropdown";
import { LinkedTableRow } from "./atoms/Table";
import actions from "@/_server";
import { allRemove } from "@/_server/pages";
import React, { useEffect, useSyncExternalStore } from "react";

interface DeleteButtonProps extends React.HTMLProps<HTMLButtonElement> {
  pathname: string;
  isDeleted?: boolean | undefined;
}

export function DeleteButton(props: DeleteButtonProps) {
  const { pathname, isDeleted, ...buttonProps } = props;

  const handleClick = async () => {
    if (!window.confirm("削除しますか？")) return;
    const res = await actions.pages.allRemove(pathname, isDeleted);
    if (res.statusCode !== 200) return;
    alert("削除しました");
    window.location.reload();
  };

  return <button {...buttonProps} type="button" onClick={handleClick} />;
}

/**
 * with checked store
 */
interface DeleteAllButtonProps extends React.HTMLProps<HTMLButtonElement> {
  isDeleted?: boolean | undefined;
}

export function DeleteAllButton(props: DeleteAllButtonProps) {
  const { isDeleted, ...buttonProps } = props;

  const handleClick = async () => {
    if (!window.confirm("全て削除しますか？")) return;
    await Promise.all([...set].map((path) => allRemove(path, isDeleted)));
    alert("削除しました");
    window.location.reload();
    set.clear();
    listeners.forEach((f) => f());
  };

  return <button {...buttonProps} type="button" onClick={handleClick} />;
}

const listeners = new Set<Function>();
const set = new Set<string>();
const get = () => set.size;
const sub = (update = () => {}) => {
  listeners.add(update);
  return () => {
    listeners.delete(update);
  };
};

export function Checkbox(props: { pathname: string | string[] }) {
  let { pathname } = props;
  if (!Array.isArray(pathname)) pathname = [pathname];

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) pathname.forEach((p) => set.add(p));
    else pathname.forEach((p) => set.delete(p));
    listeners.forEach((f) => f());
  };

  return (
    <input onClick={handleClick} onChange={handleChange} type="checkbox" />
  );
}

export function CheckedSwitch(props: {
  children: React.ReactNode;
  pageLen: number;
}) {
  const { children, pageLen } = props;

  useSyncExternalStore(sub, get, get);
  useEffect(() => set.clear(), []); // clear if change page

  if (set.size <= 0)
    return <p className="text-[#686889]">{pageLen} 件を表示</p>;
  return (
    <Dropdown leftside>
      <Button className="relative pr-10 border border-[#563BFF] text-[#563BFF]">
        <span>
          <span>{set.size} 件を選択中</span>
          <span className="absolute right-2 down" />
        </span>
      </Button>
      {children}
    </Dropdown>
  );
}

export function TableRow(props: React.ComponentProps<typeof LinkedTableRow>) {
  useSyncExternalStore(sub, get, get);
  return <LinkedTableRow disable={set.size > 0} {...props} />;
}
