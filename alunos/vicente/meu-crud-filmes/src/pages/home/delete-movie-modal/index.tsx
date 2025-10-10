import { Button } from '../../../components/button';
import { Modal } from '../../../components/modal';
import { deleteMovie } from '../../../services/movies/delete';

interface DeleteMovieModalProps {
  movieId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export function DeleteMovieModal({ movieId, onClose, onSuccess }: DeleteMovieModalProps) {
  async function handleDelete() {
    await deleteMovie(movieId);
    
    onSuccess();
  }

  return (
    <Modal.Root onClose={onClose}>
      <Modal.Header>
        <Modal.Title>Excluir Filme</Modal.Title>
        <Modal.Description>
          Tem a certeza de que deseja excluir este filme? Esta ação não pode ser desfeita.
        </Modal.Description>
      </Modal.Header>

      <Modal.Footer>
        <Button type="button" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="button" onClick={handleDelete}>
          Sim, Excluir
        </Button>
      </Modal.Footer>
    </Modal.Root>
  );
}