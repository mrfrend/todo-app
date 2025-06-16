import type { ButtonHTMLAttributes } from "react";
import cn from "classnames";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: "primary" | "transparent";
}

const baseStyles =
  "px-5 py-[10px] rounded-[5px] font-kanit font-medium uppercase cursor-pointer";

const variantStyles = {
  primary: "bg-purple text-white",
  transparent: "bg-transparent text-purple border border-purple",
};

export function Button({
  className,
  variant,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        className,
        baseStyles,
        variantStyles[variant],
        "hover:shadow-md hover:shadow-purple transition-shadow transition-colors",
        { "hover:bg-purple/80": variant == "primary" }
      )}
    >
      {children}
    </button>
  );
}
