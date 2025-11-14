import type { Movie } from '../../types/movie';
import api from '../../utils/api'; 

export type UpdateMovieData = Omit<Movie, 'id'>; 

export async function updateMovie(
  movieId: number, 
  movieData: UpdateMovieData
): Promise<Movie> {
  
  console.log(`Tentando editar filme ID ${movieId} com dados:`, movieData);

  try {
    const response = await api.put<Movie>(`/${movieId}`, movieData, {
        validateStatus: (status) => {
            return (status >= 200 && status < 300) || status === 418;
        },
    });

    console.log(`Sucesso na edição! Status retornado: ${response.status}`);
    
    if (response.status === 418 && (!response.data || Object.keys(response.data).length === 0)) {
        console.warn('Servidor retornou 418 com corpo vazio. Usando dados do formulário com o ID original.');
        return {
            id: movieId,
            ...movieData,
        } as Movie;
    }
    
    return response.data; 

  } catch (error: any) {
    console.error('==================== ERRO AO EDITAR FILME ====================');
    if (error.response) {
      console.error('Status HTTP REAL:', error.response.status);
      console.error('Dados de Erro do Servidor:', error.response.data);
    } else {
      console.error('Erro de Rede (API Offline ou Problema CORS).');
    }
    console.error('==============================================================');

    throw new Error('Falha na edição. Consulte o console para detalhes do erro.');
  }
}