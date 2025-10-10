import type { Movie } from '../../types/movie';

const movies: Movie[] = [
  {
    id: 1,
    title: 'Gente Grande',
    director: 'Dennis Dugan',
    year: 2010,
    genre: 'Comédia, Buddy, Drama',
  },
  {
    id: 2,
    title: 'The Batman',
    director: 'Matt Reeves',
    year: 2022,
    genre: 'Ação, Aventura, Mistério',
  },
  {
    id: 3,
    title: 'Harry Potter e o Prisioneiro de Azkaban',
    director: 'Alfonso Cuarón',
    year: 2004,
    genre: 'Ação, Mistério, Fantasia',
  },
];

let moviesPromise: Promise<Movie[]> | null = null;

export async function getMovies() {
  if (moviesPromise) {
    return moviesPromise;
  }

  moviesPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(movies);
    }, 500);
  });

  return moviesPromise;
}