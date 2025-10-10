import type { Movie } from '../../types/movie';
import { getMovies } from './get';

export async function updateMovie(id: number, data: Omit<Movie, 'id'>) {
  const movies = await getMovies();

  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex > -1) {
    movies[movieIndex] = {
      id,
      ...data,
    };
    console.log(`Filme com ID ${id} foi atualizado.`);
    return movies[movieIndex];
  }

  return null;
}