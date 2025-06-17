import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { selectTasks } from "../task/taskSlice";
import type { Task } from "../../types/task.type";

export type FilterCategories = "all" | "complete" | "incomplete";

export interface FiltersState {
  query?: string;
  category?: FilterCategories;
}

const initialState: FiltersState = {
  query: "",
  category: "all",
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setQuery: (state: FiltersState, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setCategory: (
      state: FiltersState,
      action: PayloadAction<FilterCategories>
    ) => {
      state.category = action.payload;
    },
  },
});

export const selectFilters = (state: RootState) => state.filters;

export const selectQuery = createSelector([selectFilters], (filters: FiltersState) => filters.query);
export const selectCategory = createSelector([selectFilters], (filters: FiltersState) => filters.category || 'all');

export const selectFilteredTasks = createSelector(
  [selectTasks, selectFilters],
  (tasks: Task[], filters: FiltersState) => {
    const { query, category } = filters;
    let filteredTasks = tasks;

    if (query) {
      filteredTasks = filteredTasks.filter((task) =>
        task.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    switch (category) {
      case "all":
        break;
      case "complete":
        filteredTasks = filteredTasks.filter((task) => task.isComplete);
        break;
      case "incomplete":
        filteredTasks = filteredTasks.filter((task) => !task.isComplete);
        break;
      default:
        break;
    }
    return filteredTasks;
  }
);

export const { setQuery, setCategory } = filtersSlice.actions;

export default filtersSlice.reducer;
