import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames'
import styles from './DropdownContent.module.css'

export interface DropdownContentProps extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>,HTMLUListElement> {
  children?: React.ReactNode;
  opened: boolean;
}

export function DropdownContent({children, className, opened, ...props}: DropdownContentProps) {
  return (
    <ul className={cn(className, styles.dropdownContent, {[styles.dropdownContentOpened]: opened})} {...props}>
     {children}
    </ul>
  );
}