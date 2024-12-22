"use client";

import { MenuLink } from "../layout";
import React from "react";

interface Props {
  active?: boolean;
  title: string;
  href?: string;
  setting?: string;
  children: React.ReactNode;
}
export default function Header(props: Props) {
  const { children, active, title, href, setting } = props;

  return (
    <>
      <div className="px-6 py-2 w-full h-[58px] flex items-center justify-between">
        <div className="font-bold">{title}</div>
        {href && setting ? (
          <MenuLink active={active} href={href} className="top-2 right-2">
            {setting}
          </MenuLink>
        ) : null}
      </div>
      <div className="px-6 pt-2 pb-4 w-full flex gap-6 justify-between border-b border-[#F4F4F9]">
        {children}
      </div>
    </>
  );
}
