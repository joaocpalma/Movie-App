const API_KEY = '51700efdc7864151db1c99c00542793b';
const BASE_URL = 'https://api.themoviedb.org/3';
const ANIME_URL = 'https://api.jikan.moe/v4';

//GetPopular APIs
export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const getPopularTvShows = async () => {
  const response = await fetch(
    `${BASE_URL}/trending/tv/week?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.results;
};

export const getPopularAnimes = async () => {
  const response = await fetch(
    `${ANIME_URL}/top/anime?type=&filter=bypopularity`
  );
  const data = await response.json();
  return data.data;
};

export const getUpcomingAnimes = async () => {
  const response = await fetch(`${ANIME_URL}/top/anime?type=&filter=upcoming`);
  const data = await response.json();
  return data.data;
};

//Search APIs
export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
};

export const searchTvShows = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
};

export const searchAnime = async (query) => {
  const response = await fetch(
    `${ANIME_URL}/anime?q=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data.data; // 'data' contains the array of anime results
};

//Details APIs
export const getMovieDetails = async (movie) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movie.id}?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data;
};

export const getTvSeriesDetails = async (tvshow) => {
  const response = await fetch(
    `${BASE_URL}/tv/${tvshow.id}?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data;
};

export const getAnimeDetails = async (anime) => {
  const response = await fetch(`${ANIME_URL}/anime/${anime.mal_id}/full`);
  const data = await response.json();
  console.log(data.data);
  return data.data;
};

//Upcoming APIs
export const getTrendingMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.results;
};

export const getTrendingTvShows = async () => {
  const response = await fetch(
    `${BASE_URL}/trending/tv/week?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.results;
};
