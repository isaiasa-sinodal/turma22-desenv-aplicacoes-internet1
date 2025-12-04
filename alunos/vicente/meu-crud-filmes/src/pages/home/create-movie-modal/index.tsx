import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Button } from '../../../components/button';
import { Input } from '../../../components/input';
import { Modal } from '../../../components/modal';
import { createMovie, type CreateMovieData } from '../../../services/movies/create/create'; 
import { searchMovieByTitle } from '../../../services/external/movieSearch';
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
  const [isAutoFilling, setIsAutoFilling] = useState(false);

  async function handleAutoFill() {
    if (!title.trim()) return; 

    setIsAutoFilling(true); 

    try {
      const movieData = await searchMovieByTitle(title);

      if (movieData) {
        setDirector(movieData.Director);

        setYear(movieData.Year); 
        setGenre(movieData.Genre);
        setErrorMessage(null);
      }
    } catch (error) {
      console.error("Erro no preenchimento automático", error);
    } finally {
      setIsAutoFilling(false);
    }
  }

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
        const message = error.message || 'Erro de comunicação com a API.';
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
          Digite o título e clique fora (ou aperte Tab) para buscar dados automáticos.
        </Modal.Description>
      </Modal.Header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div style={{ position: 'relative' }}>
            <Input
              label="Título"
              placeholder="Ex: O Poderoso Chefão"
              value={title}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setTitle(event.target.value)
              }
              onBlur={handleAutoFill}
              disabled={isLoading || isAutoFilling}
            />
            {isAutoFilling && (
                <span style={{ 
                    position: 'absolute', 
                    right: 0, 
                    top: 0, 
                    fontSize: '12px', 
                    color: '#666',
                    marginTop: '4px'
                }}>
                    Buscando dados...
                </span>
            )}
        </div>

        <Input
          label="Diretor"
          value={director}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setDirector(event.target.value)
          }
          disabled={isLoading || isAutoFilling}
        />
        <Input
          label="Ano"
          type="number"
          value={year}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setYear(event.target.value)
          }
          disabled={isLoading || isAutoFilling}
        />
        <Input
          label="Gênero"
          value={genre}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setGenre(event.target.value)
          }
          disabled={isLoading || isAutoFilling}
        />

        {errorMessage && (
            <p style={{ color: 'red', margin: '10px 0', textAlign: 'center' }}>
                <strong>{errorMessage}</strong>
            </p>
        )}

        <Modal.Footer>
          <Button type="button" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading || isAutoFilling}>
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </Button>
        </Modal.Footer>
      </form>
    </Modal.Root>
  );
}