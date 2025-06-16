import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type HTMLAttributes,
  type KeyboardEvent,
} from "react";
import cn from "classnames";
import { Pencil, Trash } from "lucide-react";

export interface TaskItemProps extends HTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode;
  onDelete: () => void;
  onEdit: (newTaskName: string) => void;
  onToggleCheckbox: (e: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}
export function TaskItem({
  children,
  className,
  onDelete,
  onEdit,
  onToggleCheckbox,
  checked,
  ...props
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>(children as string);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onEdit(e.currentTarget.value);
      setIsEditing(false);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const textOrInput = isEditing ? (
    <input
      ref={inputRef}
      onChange={handleChange}
      onKeyDown={handleEnterPress}
      type="text"
      value={value}
    />
  ) : (
    children
  );

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <li
      className={cn(
        className,
        "flex items-start gap-2 justify-between pb-4 border-b border-b-purple"
      )}
      {...props}
    >
      <div
        className={cn("flex items-center gap-4", {
          "line-through": checked && !isEditing,
        })}
      >
        <input
          checked={checked}
          className="size-[26px] accent-purple"
          type="checkbox"
          onChange={onToggleCheckbox}
        />
        {textOrInput}
      </div>

      <aside className="flex items-center gap-[10px]">
        <button
          type="button"
          className="cursor-pointer p-1 flex items-center justify-center"
          onClick={() => setIsEditing((i) => !i)}
        >
          <Pencil
            size={18}
            color="gray"
            className="transition-colors hover:stroke-purple"
          />
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="cursor-pointer p-1 flex items-center justify-center"
        >
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
