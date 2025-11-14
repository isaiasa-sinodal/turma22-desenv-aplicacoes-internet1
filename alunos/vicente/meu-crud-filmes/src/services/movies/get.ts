import type { Movie } from '../../types/movie';
import api from '../../utils/api';

export async function getMovies(): Promise<Movie[]> {
  try {
    const response = await api.get<Movie[]>(''); 
    return response.data;
  } catch (error) {
    throw new Error('Não foi possível carregar o catálogo de filmes.');
  }
}