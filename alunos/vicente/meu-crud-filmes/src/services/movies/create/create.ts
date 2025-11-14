import type { Movie } from '../../../types/movie';
import api from '../../../utils/api'; 

export type CreateMovieData = Omit<Movie, 'id'>;

export async function createMovie(movieData: CreateMovieData): Promise<Movie> {
  console.log('Tentando cadastrar filme com dados:', movieData);
  
  try {

    const response = await api.post<Movie>('', movieData, {

        validateStatus: (status) => {
            return (status >= 200 && status < 300) || status === 418;
        },
    });

    console.log(`Sucesso na requisição! Status retornado: ${response.status}`);
    console.log('Objeto retornado pelo servidor:', response.data); 
    
    if (!response.data || Object.keys(response.data).length === 0) {
        console.warn('Servidor retornou 418 com corpo vazio. Usando dados do formulário com ID simulado.');
        return {
            id: Date.now(),
            ...movieData,
        } as Movie;
    }
    
    return response.data; 

  } catch (error: any) {
    console.error('==================== ERRO AO CADASTRAR FILME ====================');
    if (error.response) {
      console.error('Status HTTP REAL:', error.response.status);
      console.error('Dados de Erro do Servidor:', error.response.data);
    } else {
      console.error('Erro de Rede (API Offline ou Problema CORS).');
    }
    console.error('================================================================');

    throw new Error('Falha no cadastro. Consulte o console para detalhes do erro.');
  }
}