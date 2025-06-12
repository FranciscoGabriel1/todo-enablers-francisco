import { useState, useEffect, useMemo, ChangeEvent, FormEvent } from 'react';
import { PlusCircle, ClipboardText } from 'phosphor-react';
import { v4 as uuidv4 } from 'uuid';
import styles from './app.module.css';
import { Header } from './components/Header';
import { Task } from './components/Task';

export interface TaskType {
  id: string;
  title: string;
  isCompleted: boolean;
}

enum StorageKey {
  TASKS = 'todo-ts/tasks'
}

const initialTasks: TaskType[] = [
  { id: uuidv4(), title: 'Tarefa 1', isCompleted: false },
  { id: uuidv4(), title: 'Tarefa 2', isCompleted: false }
];

const loadTasks = (): TaskType[] => {
  try {
    const raw = localStorage.getItem(StorageKey.TASKS);
    return raw ? (JSON.parse(raw) as TaskType[]) : initialTasks;
  } catch {
    return initialTasks;
  }
};

const saveTasks = (tasks: TaskType[]): void => {
  localStorage.setItem(StorageKey.TASKS, JSON.stringify(tasks));
};

export const App = (): JSX.Element => {
  const [tasks, setTasks] = useState<TaskType[]>(loadTasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => saveTasks(tasks), [tasks]);

  const completedCount = useMemo(
    () => tasks.filter(task => task.isCompleted).length,
    [tasks]
  );

  const handleNewTaskTitleChange = ({
    target
  }: ChangeEvent<HTMLInputElement>): void => setNewTaskTitle(target.value);

  const handleCreateTask = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const title = newTaskTitle.trim();
    if (!title) return;
    setTasks(prev => [...prev, { id: uuidv4(), title, isCompleted: false }]);
    setNewTaskTitle('');
  };

  const handleToggleTaskCompletion = (id: string): void =>
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task))
    );

  const handleDeleteTask = (id: string): void =>
    setTasks(prev => prev.filter(task => task.id !== id));

  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <form className={styles.newText} onSubmit={handleCreateTask}>
          <input
            type="text"
            placeholder="Adicione uma tarefa"
            value={newTaskTitle}
            onChange={handleNewTaskTitleChange}
            required
          />
          <button type="submit">
            Criar
            <PlusCircle size={20} />
          </button>
        </form>

        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <div>
              <strong>Tarefas criadas</strong>
              <span>{tasks.length}</span>
            </div>
            <div>
              <strong>Concluídas</strong>
              <span>{completedCount} de {tasks.length}</span>
            </div>
          </div>

          <div className={styles.contentBox}>
            {tasks.length ? (
              tasks.map(task => (
                <Task
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  checked={task.isCompleted}
                  onComplete={handleToggleTaskCompletion}
                  onDelete={handleDeleteTask}
                />
              ))
            ) : (
              <>
                <ClipboardText size={56} />
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <small>Crie tarefas e organize seus itens a fazer</small>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};
