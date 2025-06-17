import {
  useEffect,
  useRef,
  type HTMLAttributes,
  type InputHTMLAttributes,
} from "react";
import cn from "classnames";
import { Pencil, Trash } from "lucide-react";
import type { Task } from "../../types/task.type";
import styles from "./TaskItem.module.css";

import { useTaskItemHandlers } from "../../hooks/useTaskItemState";

export interface TaskItemProps extends HTMLAttributes<HTMLLIElement> {
  taskInfo: Task;
}

type InputRef = { ref: React.RefObject<HTMLInputElement | null> };

type InputPropsWithRef = InputHTMLAttributes<HTMLInputElement> & InputRef;

function renderInputOrText(isEditing: boolean, props: InputPropsWithRef) {
  const { value } = props;
  return isEditing ? (
    <input value={value} {...props} className="dark:text-white" />
  ) : (
    value ?? ""
  );
}

export function TaskItem({ className, taskInfo, ...props }: TaskItemProps) {
  const {
    isEditing,
    handleChange,
    handleEnterPress,
    value,
    handleToggleCheckbox,
    handleDelete,
    setIsEditing
  } = useTaskItemHandlers(taskInfo);

  const inputRef = useRef<HTMLInputElement>(null);
  const textOrInput = renderInputOrText(isEditing, {
    ref: inputRef,
    type: "text",
    onChange: handleChange,
    onKeyDown: handleEnterPress,
    value: value || taskInfo.name,
  });

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <li className={cn(className, styles.item)} {...props}>
      <div className={cn(styles.itemCard)}>
        <input
          checked={taskInfo.isComplete}
          onChange={handleToggleCheckbox}
          className={styles.itemCheckbox}
          type="checkbox"
        />
        {textOrInput}
      </div>

      <aside className={styles.itemActions}>
        <button
          type="button"
          className={styles.itemActionButton}
          onClick={() => setIsEditing((i) => !i)}>
          <Pencil
            size={18}
            color="gray"
            className="transition-colors hover:stroke-purple"
          />
        </button>
        <button
          onClick={handleDelete}
          type="button"
          className={styles.itemActionButton}>
          <Trash
            size={18}
            color="gray"
            className="transition-colors hover:stroke-red-500"
          />
        </button>
      </aside>
    </li>
  );
}
