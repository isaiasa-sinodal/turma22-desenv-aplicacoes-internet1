import { useId, type ComponentProps } from 'react';
import styles from './styles.module.css';

interface InputProps extends ComponentProps<'input'> {
  label: string;
}

export function Input({ label, ...props }: InputProps) {
  const id = useId();

  return (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input id={id} className={styles.input} {...props} />
    </div>
  );
}