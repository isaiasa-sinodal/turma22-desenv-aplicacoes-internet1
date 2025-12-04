import axios from 'axios';

interface TMDBGenre {
  id: number;
  name: string;
}

interface TMDBCrew {
  job: string;
  name: string;
}

interface TMDBDetailsResponse {
  title: string;
  release_date: string;
  overview: string;
  poster_path: string | null;
  genres: TMDBGenre[];
  credits: {
    crew: TMDBCrew[];
  };
}

interface TMDBSearchResponse {
  results: { id: number }[];
}

interface MovieData {
  Title: string;
  Year: string;
  Director: string;
  Genre: string;
  Poster: string;
  Plot: string;
}

const API_KEY = 'e1699b2fd9e93f84ba2606c8cdbe78dc';

export const searchMovieByTitle = async (title: string): Promise<MovieData | null> => {
  try {
    const searchResponse = await axios.get<TMDBSearchResponse>(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${title}&language=pt-BR`
    );

    if (searchResponse.data.results && searchResponse.data.results.length > 0) {
      const movieId = searchResponse.data.results[0].id;

      const detailsResponse = await axios.get<TMDBDetailsResponse>(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=pt-BR&append_to_response=credits`
      );

      const movie = detailsResponse.data;

      const director = movie.credits.crew.find(person => person.job === 'Director');

      const genres = movie.genres.map(g => g.name).join(', ');

      return {
        Title: movie.title,
        Year: movie.release_date ? movie.release_date.split('-')[0] : 'N/A',
        Director: director ? director.name : 'Desconhecido',
        Genre: genres || 'Sem gênero',
        Poster: movie.poster_path 
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
          : 'https://via.placeholder.com/300x450?text=Sem+Imagem',
        Plot: movie.overview
      };
    }
    return null;
  } catch (error) {
    console.error("Erro ao buscar filme:", error);
    return null;
  }
};