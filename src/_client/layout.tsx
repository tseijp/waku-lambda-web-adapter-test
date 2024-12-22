"use client";

import React from "react";

interface WrapLinksProps {
  title: string;
  children?: React.ReactNode;
}

export function WrapLinks(props: WrapLinksProps) {
  const { title, children } = props;
  return (
    <div className="pb-10 flex flex-col">
      <div className="my-2 text-[12px] font-bold">{title}</div>
      {children}
    </div>
  );
}

function MenuIcon(props: { active?: boolean | undefined }) {
  const { active, ...spanProps } = props;
  return (
    <span className="mr-2 text-white" {...spanProps}>
      <svg
        width="16px"
        height="10px"
        viewBox="0 0 16 10"
        fill={active ? "#563BFE" : "#868688"}
      >
        <rect x="0" y="0" width="2" height="2"></rect>
        <rect x="0" y="4" width="2" height="2"></rect>
        <rect x="0" y="8" width="2" height="2"></rect>
        <rect x="4" y="0" width="12" height="2"></rect>
        <rect x="4" y="4" width="12" height="2"></rect>
        <rect x="4" y="8" width="12" height="2"></rect>
      </svg>
    </span>
  );
}

interface MenuLinkProps extends React.HTMLProps<HTMLAnchorElement> {
  children?: string;
  href: string;
  active?: boolean | undefined;
}

export function MenuLink(props: MenuLinkProps) {
  const { children, className, active, ...linkProps } = props;
  const activeClasses = active ? "font-bold text-[#563BFE] bg-[#E9E7FD]" : "";
  const baseClasses = "rounded text-sm p-2 flex items-center";
  return (
    <a
      {...linkProps}
      className={`${className} ${baseClasses} ${activeClasses}`}
    >
      <MenuIcon active={active} />
      {children}
    </a>
  );
}
