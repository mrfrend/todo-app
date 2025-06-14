import type { HTMLAttributes } from 'react';
import cn from 'classnames';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function Container({children, className}: ContainerProps) {
  return (
    <div className={cn('max-w-[750px] !mx-auto', className)}>
      {children}
    </div>
  );
}