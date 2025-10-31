import { useState, useEffect } from 'react';
import { getMovies } from '../../services/movies/get';
import type { Movie } from '../../types/movie';
import { Button } from '../../components/button';
import { CreateMovieModal } from './create-movie-modal';
import { DeleteMovieModal } from './delete-movie-modal';
import { EditMovieModal } from './edit-movie-modal';
import styles from './styles.module.css';

export function Home() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState<Movie | null>(null);
  
  const [movieToEdit, setMovieToEdit] = useState<Movie | null>(null);

  const [movies, setMovies] = useState<Movie[]>([]);

  function fetchMovies() {
    getMovies().then((data) => setMovies([...data]));
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  function handleOpenCreateModal() {
    setIsCreateModalOpen(true);
  }

  function handleCloseModals() {
    setIsCreateModalOpen(false);
    setMovieToDelete(null);
    setMovieToEdit(null);
  }

  function handleMovieSuccess() {
    handleCloseModals();
    fetchMovies();
  }

  return (
    <>
      {}
      <header className={styles.topHeader}>
        <h2>CrudWeb</h2>
      </header>
    
      {}
      <div className={styles.container}>
        {isCreateModalOpen && (
          <CreateMovieModal
            onClose={handleCloseModals}
            onSuccess={handleMovieSuccess}
          />
        )}
        
        {movieToDelete && (
          <DeleteMovieModal 
            movieId={movieToDelete.id}
            onClose={handleCloseModals}
            onSuccess={handleMovieSuccess}
          />
        )}
        
        {movieToEdit && (
          <EditMovieModal
            movie={movieToEdit}
            onClose={handleCloseModals}
            onSuccess={handleMovieSuccess}
          />
        )}

        {}
        <header className={styles.header}>
          <h1>Catálogo de Filmes</h1>
          {}
          <Button type="button" onClick={handleOpenCreateModal}>
            Adicionar Filme
          </Button>
        </header>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Diretor</th>
              <th>Ano</th>
              <th>Gênero</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.title}</td>
                <td>{movie.director}</td>
                <td>{movie.year}</td>
                <td>{movie.genre}</td>
                <td>
                  <div className={styles.actions}>
                    {}
                    <Button 
                      variant="primary" 
                      onClick={() => setMovieToEdit(movie)}
                    >
                      Editar
                    </Button>
                    {}
                    <Button 
                      variant="danger" 
                      onClick={() => setMovieToDelete(movie)}
                    >
                      Excluir
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}