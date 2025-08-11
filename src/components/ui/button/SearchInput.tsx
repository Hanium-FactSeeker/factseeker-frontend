"use client";

import React from "react";
import clsx from "clsx";
import { InputProps } from "./types";

const sizeMap = {
  sm: "h-10 text-sm px-3 rounded-lg",
  md: "h-12 text-base px-4 rounded-xl",
  lg: "h-14 text-base px-5 rounded-[20px]",
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      iconLeft,
      iconRight,
      inputSize = "lg",
      className,
      fullWidth,
      disabled,
      ...props
    },
    ref
  ) => {
    const widthClass = fullWidth ? "w-full" : "w-full md:w-[708px]";

    return (
      <div
        className={clsx(
          "relative flex items-center",
          widthClass,
          sizeMap[inputSize],
          "border border-gray-normal bg-white text-black-normal font-pretendard",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        {iconLeft && (
          <div className="pl-3 flex-shrink-0 text-gray-normal">{iconLeft}</div>
        )}

        <input
          ref={ref}
          {...props}
          className={clsx(
            "flex-1 bg-transparent outline-none",
            "placeholder:text-gray-strong",
            iconLeft ? "pl-2" : "pl-4",
            iconRight ? "pr-10" : "pr-4"
          )}
          disabled={disabled}
        />

        {iconRight && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-normal">
            {iconRight}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
