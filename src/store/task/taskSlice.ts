import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "../../types/task.type";
import type { RootState } from "../store";

interface TaskEditPayload {
  id: number;
  newName: string;
}

export const initialState: Task[] = [
  {
    id: 1,
    name: "Buy milk",
    isComplete: false,
  },
  {
    id: 2,
    name: "Go to gym",
    isComplete: true,
  },
  {
    id: 3,
    name: "Do homework",
    isComplete: false,
  },
];
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state: Task[], action: PayloadAction<Task["name"]>) => {
      const newTask: Task = {
        name: action.payload,
        id: state.length + 1,
        isComplete: false,
      };
      state.push(newTask);
    },
    removeTask: (state: Task[], action: PayloadAction<Task["id"]>) => {
      return state.filter((task) => task.id !== action.payload);
    },
    toggleTaskCompletion: (
      state: Task[],
      action: PayloadAction<Task["id"]>
    ) => {
      const selectedTask = state.find(
        (task) => task.id === action.payload
      ) as Task;
      selectedTask.isComplete = !selectedTask.isComplete;
    },

    editTaskName: (state: Task[], action: PayloadAction<TaskEditPayload>) => {
      const { id, newName } = action.payload;
      const selectedTask = state.find((task) => task.id === id) as Task;
      selectedTask.name = newName;
    },
  },
});

export const selectTasks = (state: RootState) => state.tasks;

export const { addTask, editTaskName, removeTask, toggleTaskCompletion } =
  tasksSlice.actions;

export default tasksSlice.reducer;
