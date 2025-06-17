import type { HTMLAttributes } from "react";
import cn from "classnames";
import type { Task } from "../../types/task.type";
import { TaskItem } from "../TaskItem";

export interface TaskListProps extends HTMLAttributes<HTMLUListElement> {
  tasks: Task[]
}
export function TaskList({className, tasks, ...props}: TaskListProps) {
  return (
    <ul className={cn(className, "flex flex-col gap-4")} {...props}>
      {tasks.map((task) => <TaskItem taskInfo={task} key={task.id}/>)}
    </ul>
  );
}