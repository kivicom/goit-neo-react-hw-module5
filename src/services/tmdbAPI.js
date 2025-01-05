import axios from 'axios';

const API_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNThiMTYxNmZjMDc3YTBmZGJiZDY2ZGMzMmZlOWVmZSIsIm5iZiI6MTczNTQxMTQ2Mi44OTMsInN1YiI6IjY3NzA0NzA2ZjliYzAyZTQ5ODkyZDU5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lwxHaVPr4xOx92krxM71fSlVo8Gqv4gk578I2jZXM9I';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] = API_TOKEN;

export async function getTrendingMovies() {
  const resp = await axios.get('/trending/movie/day');
  return resp.data;
}

export async function searchMovies(query) {
  const resp = await axios.get('/search/movie', {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  });
  return resp.data;
}

export async function getMovieDetails(movieId) {
  const resp = await axios.get(`/movie/${movieId}`, {
    params: { language: 'en-US' },
  });
  return resp.data;
}

export async function getMovieCast(movieId) {
  const resp = await axios.get(`/movie/${movieId}/credits`, {
    params: { language: 'en-US' },
  });
  return resp.data;
}

export async function getMovieReviews(movieId) {
  const resp = await axios.get(`/movie/${movieId}/reviews`, {
    params: { language: 'en-US', page: 1 },
  });
  return resp.data;
}
