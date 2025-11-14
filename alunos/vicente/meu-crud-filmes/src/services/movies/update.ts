import type { Movie } from '../../types/movie';
import api from '../../utils/api';

export async function updateMovie(movie: Movie): Promise<Movie> {
  try {
    const response = await api.put<Movie>(`/${movie.id}`, movie);
    return response.data;
  } catch (error) {
    console.error(`Erro ao editar o filme ID ${movie.id}:`, error);
    throw new Error(`Não foi possível editar o filme "${movie.title}".`);
  }
}