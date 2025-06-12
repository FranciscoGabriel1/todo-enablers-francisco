import { Trash } from 'phosphor-react';
import styles from './task.module.css';

export interface TaskProps {
  id: string;
  title: string;
  checked: boolean;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export const Task = ({
  id,
  title,
  checked,
  onComplete,
  onDelete,
}: TaskProps): JSX.Element | null => {
  if (!id) return null;

  const handleToggle = () => onComplete(id);
  const handleRemove = () => onDelete(id);

  return (
    <div className={styles.task}>
      <label htmlFor={id} className={styles.checkboxWrapper}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={handleToggle}
        />
        <span className={checked ? styles.checkedTitle : ''}>{title}</span>
      </label>
      <button
        type="button"
        aria-label={`Remove task ${title}`}
        onClick={handleRemove}
      >
        <Trash size={24} />
      </button>
    </div>
  );
};
