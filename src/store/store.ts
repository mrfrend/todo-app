import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./task/taskSlice";
import filterReducer from "./filter/filtersSlice";
import modalReducer from "./modal/modalSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    filters: filterReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
