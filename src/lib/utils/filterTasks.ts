import type { Task } from "../../types/task.type";

export interface Filters {
  search?: string;
  category?: "all" | "complete" | "incomplete";
}

export type FilteredTasks = typeof filterTasks;

export function filterTasks({ search, category }: Filters, tasks: Task[]) {
  let filteredTasks = tasks;

  if (search) {
    filteredTasks = tasks.filter((task) =>
      task.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (category) {
    switch (category) {
      case "all":
        break;

      case "complete":
        filteredTasks = filteredTasks.filter((task) => task.isComplete);
        break;

      case "incomplete":
        filteredTasks = filteredTasks.filter((task) => !task.isComplete);
        break;
    }
  }

  return filteredTasks;
}
