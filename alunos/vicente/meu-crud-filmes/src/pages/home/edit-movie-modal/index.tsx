import { useState, type FormEvent, type ChangeEvent, useEffect } from 'react';
import { Button } from '../../../components/button';
import { Input } from '../../../components/input';
import { Modal } from '../../../components/modal';
import { updateMovie } from '../../../services/movies/update';
import type { Movie } from '../../../types/movie';
import styles from '../create-movie-modal/styles.module.css';

interface EditMovieModalProps {
  movie: Movie;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditMovieModal({ movie, onClose, onSuccess }: EditMovieModalProps) {
  const [title, setTitle] = useState(movie.title);
  const [director, setDirector] = useState(movie.director);
  const [year, setYear] = useState(String(movie.year));
  const [genre, setGenre] = useState(movie.genre);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const movieData = {
      title,
      director,
      year: Number(year),
      genre,
    };

    // Usamos o serviço de update, passando o ID do filme
    await updateMovie(movie.id, movieData);
    
    onSuccess();
  }

  return (
    <Modal.Root onClose={onClose}>
      <Modal.Header>
        <Modal.Title>Editar Filme</Modal.Title>
        <Modal.Description>
          Altere os dados do filme abaixo.
        </Modal.Description>
      </Modal.Header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="Título"
          value={title}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setTitle(event.target.value)
          }
        />
        <Input
          label="Diretor"
          value={director}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setDirector(event.target.value)
          }
        />
        <Input
          label="Ano"
          type="number"
          value={year}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setYear(event.target.value)
          }
        />
        <Input
          label="Gênero"
          value={genre}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setGenre(event.target.value)
          }
        />

        <Modal.Footer>
          <Button type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">Salvar Alterações</Button>
        </Modal.Footer>
      </form>
    </Modal.Root>
  );
}