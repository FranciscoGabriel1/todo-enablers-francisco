import { useState, useMemo, ChangeEvent, FormEvent } from 'react';
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

const initialTasks: TaskType[] = [
  { id: uuidv4(), title: 'Tarefa 1', isCompleted: false },
  { id: uuidv4(), title: 'Tarefa 2', isCompleted: false },
];

export const App = (): JSX.Element => {
  const [tasks, setTasks] = useState<TaskType[]>(initialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  const completedCount = useMemo(
    () => tasks.filter(task => task.isCompleted).length,
    [tasks]
  );

  const handleNewTaskTitleChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setNewTaskTitle(event.target.value);
  };

  const handleCreateTask = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const title = newTaskTitle.trim();
    if (!title) return;

    setTasks(prev => [...prev, { id: uuidv4(), title, isCompleted: false }]);
    setNewTaskTitle('');
  };

  const handleToggleTaskCompletion = (id: string): void => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleDeleteTask = (id: string): void => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

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
              <span>
                {completedCount} de {tasks.length}
              </span>
            </div>
          </div>

          <div className={styles.contentBox}>
            {tasks.length > 0 ? (
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
