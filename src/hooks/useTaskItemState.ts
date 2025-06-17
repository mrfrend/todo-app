import {
  useCallback,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import type { Task } from "../types/task.type";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import {
  editTaskName,
  removeTask,
  toggleTaskCompletion,
} from "../store/task/taskSlice";

export function useTaskItemHandlers(taskInfo: Task) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>(taskInfo.name);

  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleEnterPress = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        dispatch(
          editTaskName({ id: taskInfo.id, newName: e.currentTarget.value })
        );
        setIsEditing(false);
      }
    },
    [taskInfo]
  );

  const handleToggleCheckbox = () => {
    dispatch(toggleTaskCompletion(taskInfo.id));
  };

  const handleDelete = () => {
    dispatch(removeTask(taskInfo.id));
  };

  return {
    isEditing,
    setIsEditing,
    value,
    setValue,
    handleChange,
    handleEnterPress,
    handleToggleCheckbox,
    handleDelete,
  };
}
