import api from '../../utils/api';

export async function deleteMovie(movieId: number): Promise<void> {
  try {
    await api.delete(`/${movieId}`);
  } catch (error) {
    console.error(`Erro ao excluir o filme ID ${movieId}:`, error);
    throw new Error('Não foi possível excluir o filme.');
  }
}