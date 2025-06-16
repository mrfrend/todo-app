// TaskContext.tsx
import { createContext} from "react";
import type { Task } from "../types/task.type";
import {type Filters } from "../lib/utils/filterTasks";

interface TaskContextType {
  allTasks: Task[];
  filteredTasks: Task[];
  filters: Filters;
  setFilters: (filters: Filters) => void;
  addTask: (name: string) => void;
  deleteTask: (id: number) => void;
  editTask: (id: number, name: string) => void;
  toggleTask: (id: number, isComplete: boolean) => void;
}

export const TaskContext = createContext<TaskContextType | null>(null);
