const API_KEY = 'e467ec5b-1628-45bf-844c-f994b8295c79';
const API_MOVIE_DETAILS = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';

export const apiEndpoints = {
  topMovies: 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS',
  searchMovies: 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=',
};

export async function fetchMovies(url) {
  try {
    const resp = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
    });
    const { films } = await resp.json();
    return films;
  } catch (error) {
    console.error('Ошибка при загрузке фильмов', error);
    throw error; 
  }
}

export async function getMovieInfo(id) {
  const resp = await fetch(API_MOVIE_DETAILS + id, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const movieInfo = await resp.json();
  return movieInfo;
}