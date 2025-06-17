import { Container } from "./components/Container/Container";
import { TaskList } from "./components/TaskList/TaskList";
import { useDispatch, useSelector } from "react-redux";
import { selectFilteredTasks } from "./store/filter/filtersSlice";
import { TaskFilters } from "./components/TaskFilters/TaskFilters";
import { dropDownOptions } from "./lib/constants";
import { CreateaTaskModal } from "./components/CreateTaskModal/CreateTaskModal";
import { openModal, selectModalOpened } from "./store/modal/modalSlice";
import cn from "classnames";
import type { AppDispatch } from "./store/store";
import { Plus } from "lucide-react";
function App() {
  const tasks = useSelector(selectFilteredTasks);
  const modalOpened = useSelector(selectModalOpened);
  const dispatch: AppDispatch = useDispatch();

  return (
    <>
      <Container className="relative h-dvh pt-[40px]">
        <h1 className="font-medium uppercase text-center text-2xl mb-4 dark:text-white">
          Todo list
        </h1>
        <TaskFilters
          options={dropDownOptions}
          className="flex gap-4 items-stretch"
        />
        <TaskList tasks={tasks} className="mt-4 max-w-[520px] w-full mx-auto" />
        <button
          className="absolute right-2 bottom-8 rounded-full bg-purple size-[40px] flex items-center justify-center cursor-pointer"
          onClick={() => {
            dispatch(openModal());
          }}>
          <Plus color="white" size={24} />
        </button>
      </Container>
      <CreateaTaskModal
        className={cn("absolute z-10 top-[12%] left-[50%] translate-x-[-50%]", {
          hidden: !modalOpened,
        })}
      />
    </>
  );
}

export default App;
