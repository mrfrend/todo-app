import { Container } from './components/Container/Container';
import { Dropdown } from './components/Dropdown';
import { Input } from './components/Input/Input';
import { Moon } from 'lucide-react';
import { TaskList } from './components/TaskList/TaskList';
import { TaskItem } from './TaskItem/TaskItem';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const initialTasks: string[] = ["Task 1", "Task 2", "Task 3"];

function App() {
  const options: string[] = ["all", "complete", "incomplete"];
  const [tasks, setTasks] = useState<string[]>(initialTasks);
  const deleteTask = (taskName: string) => {
    return () => {
      setTasks(t => t.filter(task => task !== taskName));
    }
  };
  const editTask = (taskName: string) => {
    return (newTaskName: string) => {
      setTasks(t => {
        const taskFiltered = t.filter(task => task !== taskName);
        return [...taskFiltered, newTaskName]

      })
    }
  }
  return (
    <Container className='relative h-dvh'>
      <h1 className='font-medium uppercase text-center text-2xl mb-4'>Todo list</h1>
      <div className='flex gap-4 items-stretch'>
        <Input className='flex-auto' placeholder='Search note...'/>
        <Dropdown className='flex' buttonText='all' options={options}/>
        <span className='p-2 basis-[50px] flex items-center justify-center bg-purple rounded-[5px]'>
          <Moon  color='white' size={24}/>
        </span>
      </div>
      <TaskList className='mt-4 max-w-[520px] w-full mx-auto'>
        {tasks.map(task => (
          <TaskItem onEdit={editTask(task)} onDelete={deleteTask(task)} key={task}>
            {task}
          </TaskItem>
        ))}
      </TaskList>
      <button className='absolute right-2 bottom-8 rounded-full bg-purple size-[40px] flex items-center justify-center cursor-pointer'>
        <Plus color='white' size={24}/>
      </button>
    </Container>
  )
}

export default App
