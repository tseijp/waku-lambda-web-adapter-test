"use client";

import React from "react";

const baseClasses =
  "px-4 py-2 font-bold text-[14px] rounded flex justify-center items-center hover:opacity-70";

interface Props extends React.HTMLProps<HTMLButtonElement> {
  plus?: boolean | undefined;
  type?: "submit" | "button";
}

export default function Button(props: Props) {
  const { className, type = "button", children, plus, ...buttonProps } = props;
  return (
    <button
      {...buttonProps}
      type={type}
      className={`${baseClasses} ${className}`}
    >
      {plus ? <span className="mr-2 text-white">+</span> : null}
      {children}
    </button>
  );
}

interface LinkButtonProps extends React.HTMLProps<HTMLAnchorElement> {
  plus?: boolean;
  href: string;
}

export function LinkButton(props: LinkButtonProps) {
  const { className, children, plus, ...buttonProps } = props;
  return (
    <a {...buttonProps} className={`${baseClasses} ${className}`}>
      {plus ? <span className="mr-2 text-white">+</span> : null}
      {children}
    </a>
  );
}
