import { Container } from "./components/Container/Container";
import { TaskList } from "./components/TaskList/TaskList";
import { TaskItem } from "./components/TaskItem/TaskItem";
import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CreateaTaskModal } from "./components/CreateTaskModal/CreateTaskModal";
import cn from "classnames";
import type { Task } from "./types/task.type";
import { TaskFilters } from "./components/TaskFilters/TaskFilters";
import { filterTasks, type Filters } from "./lib/utils/filterTasks";

const initialTasks: Task[] = [
  { name: "Learn React", isComplete: false, id: 1 },
  { name: "Learn TypeScript", isComplete: true, id: 2 },
  { name: "Learn CSS", isComplete: false, id: 3 },
];

const dropdownOptions: string[] = ["all", "complete", "incomplete"];

function App() {
  const lastID = useRef<number>(3);
  const [allTasks, setAllTasks] = useState<Task[]>(initialTasks);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: "all",
  });
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const modalInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTasks(filterTasks(filters, allTasks));
  }, [filters, allTasks]);

  const onChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const deleteTask = (currentTask: Task) => {
    return () => {
      setAllTasks((t) => t.filter((task) => task.id !== currentTask.id));
    };
  };
  const editTask = (currentTask: Task) => {
    return (newTaskName: string) => {
      setAllTasks((t) => {
        const taskIndex = t.findIndex((task) => task.id === currentTask.id);
        const newTasks = [...t];
        newTasks[taskIndex] = { ...currentTask, name: newTaskName };
        return newTasks;
      });
    };
  };
  const addTask = () => {
    if (modalInputRef.current) {
      const newTask = modalInputRef.current.value;
      setAllTasks((t) => [
        ...t,
        { name: newTask, isComplete: false, id: ++lastID.current },
      ]);
    }
  };

  const onToggleCheckbox = (currentTask: Task) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setAllTasks((t) => {
        const taskIndex = t.findIndex((task) => task.id === currentTask.id);
        const newTasks = [...t];
        newTasks[taskIndex] = {
          ...currentTask,
          isComplete: e.target.checked,
        };
        return newTasks;
      });
    };
  };

  return (
    <>
      <Container className="relative h-dvh pt-[40px]">
        <h1 className="font-medium uppercase text-center text-2xl mb-4 dark:text-white">
          Todo list
        </h1>
        <TaskFilters
          onChange={onChange}
          options={dropdownOptions}
          className="flex gap-4 items-stretch"
        />
        <TaskList className="mt-4 max-w-[520px] w-full mx-auto">
          {tasks.map((task) => (
            <TaskItem
              checked={task.isComplete}
              onToggleCheckbox={onToggleCheckbox(task)}
              onEdit={editTask(task)}
              onDelete={deleteTask(task)}
              key={task.id}
            >
              {task.name}
            </TaskItem>
          ))}
        </TaskList>
        <button
          className="absolute right-2 bottom-8 rounded-full bg-purple size-[40px] flex items-center justify-center cursor-pointer"
          onClick={() => {
            setModalVisible((m) => !m);
          }}
        >
          <Plus color="white" size={24} />
        </button>
      </Container>
      <CreateaTaskModal
        onClose={() => {
          setModalVisible(false);
        }}
        onSubmit={addTask}
        ref={modalInputRef}
        className={cn("absolute z-10 top-[12%] left-[50%] translate-x-[-50%]", {
          hidden: !modalVisible,
        })}
      />
    </>
  );
}

export default App;
