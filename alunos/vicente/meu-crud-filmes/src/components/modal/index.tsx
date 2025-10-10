import { type ComponentProps, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.css';

interface ModalRootProps {
  children: ReactNode;
  onClose: () => void;
}

function ModalRoot({ children, onClose }: ModalRootProps) {
  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body,
  );
}

function ModalHeader(props: ComponentProps<'header'>) {
  return <header className={styles.header} {...props} />;
}

function ModalTitle(props: ComponentProps<'h2'>) {
  return <h2 className={styles.title} {...props} />;
}

function ModalDescription(props: ComponentProps<'p'>) {
  return <p className={styles.description} {...props} />;
}

function ModalFooter(props: ComponentProps<'footer'>) {
  return <footer className={styles.footer} {...props} />;
}

export const Modal = {
  Root: ModalRoot,
  Header: ModalHeader,
  Title: ModalTitle,
  Description: ModalDescription,
  Footer: ModalFooter,
};