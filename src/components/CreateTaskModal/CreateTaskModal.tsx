import type { HTMLAttributes } from "react";
import cn from "classnames";
import { Input } from "../Input";
import { Button } from "../Button/Button";

export interface CreateModalProps extends HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
  onSubmit: () => void;
  ref: React.Ref<HTMLInputElement>;
}
export function CreateaTaskModal({
  className,
  children,
  ref,
  onClose,
  onSubmit,
  ...props
}: CreateModalProps) {
  return (
    <div
      className={cn(
        className,
        "max-w-[500px] max-h-[300px] h-full w-full rounded-2xl px-8 py-4 bg-white"
      )}
      {...props}>
      <form className="flex flex-col justify-between h-full">
        <header>
          <h1 className="font-kanit font-medium text-2xl text-black uppercase text-center mb-6">
            new note
          </h1>
          <Input
            className="w-full"
            ref={ref}
            type="text"
            placeholder="Input your note..."
          />
        </header>
        <div className="flex justify-between items-center">
          <Button onClick={onClose} type="button" variant="transparent">
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
