import type { InputHTMLAttributes } from 'react';
import cn from 'classnames';
import style from './Input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  containerStyle?: string;
}

export function Input({icon, containerStyle, className, ...props}: InputProps) {
  if (icon) {
    return (
      <div className={cn(style.inputWithIcon, containerStyle)}>
        <input className={cn(className, style.input)} {...props}/>
        <div>
          {icon}
        </div>
      </div>
    )
  }
  return (
    <input className={cn(className, style.input)} {...props} />
  );
}