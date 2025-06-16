import { Container } from "./components/Container/Container";
import { Dropdown } from "./components/Dropdown";
import { Input } from "./components/Input/Input";
import { Moon } from "lucide-react";
import { TaskList } from "./components/TaskList/TaskList";
import { TaskItem } from "./components/TaskItem/TaskItem";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import { CreateaTaskModal } from "./components/CreateTaskModal/CreateTaskModal";
import cn from "classnames";

const initialTasks: string[] = ["Task 1", "Task 2", "Task 3"];

function App() {
  const options: string[] = ["all", "complete", "incomplete"];
  const [tasks, setTasks] = useState<string[]>(initialTasks);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const modalInputRef = useRef<HTMLInputElement>(null);

  const deleteTask = (taskName: string) => {
    return () => {
      setTasks((t) => t.filter((task) => task !== taskName));
    };
  };
  const editTask = (taskName: string) => {
    return (newTaskName: string) => {
      setTasks((t) => {
        const taskIndex = t.findIndex((task) => task === taskName);
        const newTasks = [...t];
        newTasks[taskIndex] = newTaskName;
        return newTasks;
      });
    };
  };

  const addTask = () => {
    if (modalInputRef.current) {
      const newTask = modalInputRef.current.value;
      setTasks((t) => [...t, newTask]);
    }
  };
  return (
    <>
      <Container className="relative h-dvh pt-[40px]">
        <h1 className="font-medium uppercase text-center text-2xl mb-4">
          Todo list
        </h1>
        <div className="flex gap-4 items-stretch">
          <Input className="flex-auto" placeholder="Search note..." />
          <Dropdown className="flex" buttonText="all" options={options} />
          <span className="p-2 basis-[50px] flex items-center justify-center bg-purple rounded-[5px]">
            <Moon color="white" size={24} />
          </span>
        </div>
        <TaskList className="mt-4 max-w-[520px] w-full mx-auto">
          {tasks.map((task) => (
            <TaskItem
              onEdit={editTask(task)}
              onDelete={deleteTask(task)}
              key={task}>
              {task}
            </TaskItem>
          ))}
        </TaskList>
        <button
          className="absolute right-2 bottom-8 rounded-full bg-purple size-[40px] flex items-center justify-center cursor-pointer"
          onClick={() => {
            setModalVisible((m) => !m);
          }}>
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
