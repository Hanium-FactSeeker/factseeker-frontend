"use client";

import React from "react";
import clsx from "clsx";
import { TextInputProps } from "./types";

const sizeMap = {
  sm: "h-10 text-sm px-3 rounded-lg",
  md: "h-12 text-base px-4 rounded-xl",
  lg: "h-14 text-base px-5 rounded-[20px]",
};

export default function TextInput({
  className = "",
  iconLeft,
  iconRight,
  inputSize = "md",
  fullWidth,
  ...props
}: TextInputProps) {
  return (
    <div
      className={clsx(
        "relative flex items-center gap-2 bg-[#F2F2F2] text-black",
        sizeMap[inputSize],
        fullWidth ? "w-full" : "w-96",
        className
      )}
    >
      {iconLeft && (
        <div className="text-[#B0B0B0] flex items-center justify-center">
          {iconLeft}
        </div>
      )}

      <input
        {...props}
        className={clsx(
          "flex-1 bg-transparent text-black placeholder-[#A0A0A0] font-normal outline-none",
          "focus:outline-none focus:ring-0 selection:bg-transparent appearance-none select-text"
        )}
      />

      {iconRight && (
        <div className="text-[#B0B0B0] flex items-center justify-center">
          {iconRight}
        </div>
      )}
    </div>
  );
}
