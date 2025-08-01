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
      inputSize = "lg", // ✅ 커스텀 이름 사용
      className,
      fullWidth,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={clsx(
          "relative",
          fullWidth ? "w-full" : "w-[708px]",
          sizeMap[inputSize], // ✅ string literal union만 허용
          "flex items-center border border-[#D9DBDC] bg-white text-[#626262] font-pretendard",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        {iconLeft && (
          <div className="pl-3 flex-shrink-0 text-[#D9DBDC]">{iconLeft}</div>
        )}
        <input
          ref={ref}
          {...props}
          className={clsx(
            "flex-1 bg-transparent outline-none placeholder:text-[#B0B0B0]",
            iconLeft ? "pl-2" : "pl-4",
            iconRight ? "pr-10" : "pr-4"
          )}
          disabled={disabled}
        />
        {iconRight && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D9DBDC]">
            {iconRight}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
