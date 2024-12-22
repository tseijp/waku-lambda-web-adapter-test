"use client";

import Border from "./Border";
import React, { Fragment, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Props extends React.HTMLProps<HTMLSpanElement> {
  children: React.ReactNode[];
  as?: any;
  type?: "submit" | "button";
  leftside?: boolean;
  upside?: boolean;
}

export default function Dropdown(props: Props) {
  const { children, as, upside, leftside, ...buttonProps } = props;
  const [trigger, ...portal] = children;
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null!);

  const wrapRef = useRef((el: HTMLDivElement | null) => {
    if (!el) return;

    const { width, height } = el.getBoundingClientRect();
    const rect = buttonRef.current.getBoundingClientRect();
    let { x, y, width: w, height: h } = rect;

    x += w / 2;
    y += h / 2;

    const dy = rect.height / 2 + 8;
    const dx = rect.width / 2;
    const top = upside ? y - dy - height : y + dy;
    const left = leftside ? x - w + dx : x - width + dx;

    el.style.left = `${left}px`;
    el.style.top = `${top}px`;
  }).current;

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <>
      <span {...buttonProps} onClick={handleOpen} ref={buttonRef}>
        {trigger}
      </span>
      {isOpen
        ? createPortal(
            <div
              className="z-[100] fixed top-0 left-0 w-full h-full"
              onClick={handleClose}
            >
              <div
                ref={wrapRef}
                className="absolute z-[100] bg-white rounded border border-[#ddd] shadow-[#0000001a]"
              >
                {portal.length <= 1
                  ? portal
                  : portal.map((child, index) => (
                      <Fragment key={index}>
                        {index === 0 ? null : <Border />}
                        {child}
                      </Fragment>
                    ))}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
