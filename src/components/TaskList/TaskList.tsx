import type { HTMLAttributes } from "react";
import cn from "classnames";

export interface TaskListProps extends HTMLAttributes<HTMLUListElement> {
  children?: React.ReactNode;
}
export function TaskList({className, children, ...props}: TaskListProps) {
  return (
    <ul className={cn(className, "flex flex-col gap-4")} {...props}>
        {children}
    </ul>
  );
}