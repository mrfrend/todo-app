import { useRef, type HTMLAttributes } from "react";
import cn from "classnames";
import { Input } from "../Input";
import { Button } from "../Button/Button";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { closeModal } from "../../store/modal/modalSlice";
import { addTask } from "../../store/task/taskSlice";

export interface CreateModalProps extends HTMLAttributes<HTMLDivElement> {}
export function CreateaTaskModal({
  className,
  children,
  ...props
}: CreateModalProps) {
  const dispatch: AppDispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const onCancel = () => dispatch(closeModal());
  const onSubmit = () => {
    dispatch(addTask(inputRef.current!.value));
  };
  return (
    <div
      className={cn(
        className,
        "max-w-[500px] max-h-[300px] h-full w-full rounded-2xl px-8 py-4 bg-white dark:bg-black dark:border dark:border-white"
      )}
      {...props}>
      <form className="flex flex-col justify-between h-full">
        <header>
          <h1 className="font-kanit font-medium text-2xl text-black uppercase text-center mb-6 dark:text-white">
            new note
          </h1>
          <Input
            className="w-full"
            ref={inputRef}
            type="text"
            placeholder="Input your note..."
          />
        </header>
        <div className="flex justify-between items-center">
          <Button onClick={onCancel} type="button" variant="transparent">
            Cancel
          </Button>
          <Button onClick={onSubmit} type="button" variant="primary">
            Apply
          </Button>
        </div>
      </form>
    </div>
  );
}
