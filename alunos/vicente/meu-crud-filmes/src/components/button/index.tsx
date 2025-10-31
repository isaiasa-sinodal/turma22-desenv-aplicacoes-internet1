import { type ComponentProps } from 'react';
import styles from './styles.module.css';

type ButtonVariant = 'primary' | 'danger';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
}

export function Button({
  children,
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  const buttonClassName = `${styles.button} ${styles[variant]} ${
    className || ''
  }`;

  return (
    <button className={buttonClassName} {...props}>
      {children}
    </button>
  );
}