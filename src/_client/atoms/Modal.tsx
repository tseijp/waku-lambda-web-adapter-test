"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";

interface Props extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode[];
  small?: boolean;
}

const stopPropergation = (e: React.MouseEvent) => e.stopPropagation();

export default function Modal(props: Props) {
  const { children, className, small, ...divProps } = props;
  const [trigger, ...portal] = children;
  const [isOpen, set] = useState(false);

  const handleOpen = () => {
    set(true);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    set(false);
  };

  const baseClasses = "bg-white rounded-lg";
  const sizeClasses = small
    ? "absolute -top-2 center-x"
    : "w-[80vw] h-[80vh] center-x center-y";

  return (
    <>
      <div {...divProps} onClick={handleOpen}>
        {trigger}
      </div>
      {isOpen
        ? createPortal(
            <div
              className="fixed top-0 left-0 w-full h-screen bg-black/20"
              onClick={handleClose}
            >
              <div
                className={`${baseClasses} ${sizeClasses}`}
                onClick={stopPropergation}
              >
                {portal}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
