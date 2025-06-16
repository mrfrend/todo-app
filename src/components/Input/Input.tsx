import type {InputHTMLAttributes } from "react";
import cn from "classnames";
import style from "./Input.module.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  containerStyle?: string;
  ref?: React.Ref<HTMLInputElement>;
  value?: string;
}

export function Input({
  icon,
  containerStyle,
  value,
  ref,
  className,
  ...props
}: InputProps) {
  if (icon) {
    return (
      <div className={cn(style.inputWithIcon, containerStyle)}>
        <input
          value={value}
          ref={ref}
          className={cn(className, style.input)}
          {...props}
        />
        <div>{icon}</div>
      </div>
    );
  }
  return (
    <input
      value={value}
      ref={ref}
      className={cn(className, style.input)}
      {...props}
    />
  );
}
