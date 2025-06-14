import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import cn from 'classnames';
import styles from './DropdownItem.module.css';

export interface DropdownItemProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children?: React.ReactNode;
}

export function DropdownItem({children, className, type = "button", ...props}: DropdownItemProps) {
  return (
    <li>
      <button type={type} className={cn(styles.dropdownItem, className)} {...props}>
        {children}
      </button>
    </li>
  );
}