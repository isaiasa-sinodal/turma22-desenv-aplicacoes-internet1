import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Button } from '../../../components/button';
import { Input } from '../../../components/input';
import { Modal } from '../../../components/modal';
import { createMovie, type CreateMovieData } from '../../../services/movies/create/create'; 
import styles from './styles.module.css';

interface CreateMovieModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateMovieModal({ onClose, onSuccess }: CreateMovieModalProps) {
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); 

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    const movieData: CreateMovieData = {
      title,
      director,
      year: Number(year),
      genre,
    };

    try {
        await createMovie(movieData);
        
        onSuccess();
    } catch (error: any) {
        console.error('Erro de submissão no modal:', error);
        
        const message = error.message || 'Erro de comunicação com a API. Consulte o console.';
        setErrorMessage(message); 
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <Modal.Root onClose={onClose}>
      <Modal.Header>
        <Modal.Title>Cadastrar Filme</Modal.Title>
        <Modal.Description>
          Preencha os campos para adicionar um novo filme.
        </Modal.Description>
      </Modal.Header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="Título"
          placeholder="Ex: O Poderoso Chefão"
          value={title}
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

        {}
        {errorMessage && (
            <p style={{ color: 'red', margin: '10px 0', textAlign: 'center' }}>
                **{errorMessage}**
            </p>
        )}
        {}

        <Modal.Footer>
          <Button type="button" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </Button>
        </Modal.Footer>
      </form>
    </Modal.Root>
  );
}