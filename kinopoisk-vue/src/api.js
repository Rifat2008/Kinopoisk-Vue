const API_KEY = 'e467ec5b-1628-45bf-844c-f994b8295c79';

export async function loadMovies(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const { films } = await resp.json();
  return films;
}
