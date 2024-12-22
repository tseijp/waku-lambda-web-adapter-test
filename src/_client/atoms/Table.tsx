"use client";

import React from "react";

interface Props extends React.HTMLProps<HTMLTableElement> {
  checkbox?: boolean;
  children: React.ReactNode[];
}

const handleChangeRef = (el: HTMLTableElement) => {
  if (!el) return;
  const [head, ...rows] = Array.from(
    el.querySelectorAll("input"),
  ) as HTMLInputElement[];

  head?.addEventListener("change", () => {
    rows.forEach((row) => {
      row.checked = head.checked;
    });
  });
  rows.forEach((row) => {
    row.addEventListener("change", () => {
      if (row.checked) {
        if (head) head.checked = true;
      } else if (!rows.some((row) => row.checked))
        if (head) head.checked = false;
    });
  });
};

export default function Table(props: Props) {
  const { children, className, checkbox, ...tableProps } = props;
  const [head, ...rows] = children;
  const baseClasses = "flex flex-col text-left w-full scroll-x";

  return (
    <table
      ref={checkbox ? handleChangeRef : void 0}
      className={`${baseClasses} ${className}`}
      {...tableProps}
    >
      <thead className="text-[#68688A]">{head}</thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

interface LinkedTableRowProps extends React.HTMLProps<HTMLTableRowElement> {
  href: string;
  active?: boolean;
  disable?: boolean;
}

export function LinkedTableRow(props: LinkedTableRowProps) {
  const { children, className, href, active, disable, ...other } = props;
  const baseClasses = "flex";
  const activeClasses = disable
    ? "hover:bg-white"
    : active
      ? "text-[#563BFE] bg-[#E9E7FD] hover:bg-[#E9E7FD] font-bold"
      : "hover:bg-[#F2FCFF] cursor-pointer";

  const handleClick = () => {
    if (disable) return;
    window.location.pathname = href;
  };

  return (
    <tr
      onClick={handleClick}
      className={`${baseClasses} ${className} ${activeClasses}`}
      {...other}
    >
      {children}
    </tr>
  );
}
