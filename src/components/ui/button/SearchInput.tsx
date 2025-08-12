"use client";

import clsx from "clsx";
import { InputHTMLAttributes } from "react";

const sizeMap = {
  sm: "h-10 text-sm px-3 rounded-lg",
  md: "h-12 text-base px-4 rounded-xl",
  lg: "h-14 text-base px-5 rounded-[20px]",
};

type SizeKey = keyof typeof sizeMap; // 'sm' | 'md' | 'lg'

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: SizeKey;
  fullWidth?: boolean;
  iconRight?: React.ReactNode;
}

export default function SearchInput({
  className = "",
  inputSize = "md",
  fullWidth,
  iconRight,
  ...props
}: SearchInputProps) {
  return (
    <div
      className={clsx(
        "relative flex items-center gap-2 bg-white border border-gray-normal rounded-xl",
        sizeMap[inputSize],
        fullWidth ? "w-full" : "w-96",
        className
      )}
    >
      <input
        {...props}
        className={clsx(
          "flex-1 bg-transparent text-black-normal placeholder-gray-normal outline-none"
        )}
      />
      {iconRight && <div className="flex items-center pr-3">{iconRight}</div>}
    </div>
  );
}
