import { Button } from '../../../components/button';
import { Input } from '../../../components/input';
import { Modal } from '../../../components/modal';
import styles from './styles.module.css';

interface CreateMovieModalProps {
  onClose: () => void;
}

export function CreateMovieModal({ onClose }: CreateMovieModalProps) {
  return (
    <Modal.Root onClose={onClose}>
      <Modal.Header>
        <Modal.Title>Cadastrar Filme</Modal.Title>
        <Modal.Description>
          Preencha os campos para adicionar um novo filme.
        </Modal.Description>
      </Modal.Header>

      <form className={styles.form}>
        <Input label="Título" placeholder="Ex: O Poderoso Chefão" />
        <Input label="Diretor" placeholder="Ex: Francis Ford Coppola" />
        <Input label="Ano" type="number" placeholder="Ex: 1972" />
        <Input label="Gênero" placeholder="Ex: Crime, Drama" />
      </form>

      <Modal.Footer>
        <Button type="button" onClick={onClose}>
          Cancelar
        </Button>
        <Button>Cadastrar</Button>
      </Modal.Footer>
    </Modal.Root>
  );
}