import type { Movie } from '../../../types/movie';
import { getMovies } from '../get';

export async function createMovie(data: Omit<Movie, 'id'>) {
  const movies = await getMovies();

  const newId = movies.length > 0 ? Math.max(...movies.map((m) => m.id)) + 1 : 1;

  const newMovie: Movie = {
    id: newId,
    ...data,
  };

  movies.push(newMovie);

  return newMovie;
}
