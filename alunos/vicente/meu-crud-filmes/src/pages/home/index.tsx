import { useState, useEffect } from 'react';
import { getMovies } from '../../services/movies/get';
import type { Movie } from '../../types/movie';
import styles from './styles.module.css';
import { Button } from '../../components/button';
import { CreateMovieModal } from './create-movie-modal';

export function Home() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);

  function fetchMovies() {
    getMovies().then(setMovies);
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  function handleOpenCreateModal() {
    setIsCreateModalOpen(true);
  }

  function handleCloseCreateModal() {
    setIsCreateModalOpen(false);
  }

  function handleMovieCreated() {
    handleCloseCreateModal();
    fetchMovies();
  }

  return (
    <div className={styles.container}>
      {isCreateModalOpen && (
        <CreateMovieModal
          onClose={handleCloseCreateModal}
          onSuccess={handleMovieCreated}
        />
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="Título"
          placeholder="Ex: O Poderoso Chefão"
          value={title}
          // 2. Adicionar o tipo ao evento
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setTitle(event.target.value)
          }
        />
        <Input
          label="Diretor"
          placeholder="Ex: Francis Ford Coppola"
          value={director}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setDirector(event.target.value)
          }
        />
        <Input
          label="Ano"
          type="number"
          placeholder="Ex: 1972"
          value={year}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setYear(event.target.value)
          }
        />
        <Input
          label="Gênero"
          placeholder="Ex: Crime, Drama"
          value={genre}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setGenre(event.target.value)
          }
        />

        <Modal.Footer>
          <Button type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">Cadastrar</Button>
        </Modal.Footer>
      </form>
    </Modal.Root>
  );
}