import { getMovies } from './get';

export async function deleteMovie(id: number) {
  const movies = await getMovies();

  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex > -1) {
    movies.splice(movieIndex, 1);
    console.log(`Filme com ID ${id} foi excluído.`);
  }

}