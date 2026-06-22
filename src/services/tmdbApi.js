import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWMwZWU2ZDdlNWJlNTc5NGNjZmQ2MGIzYzBiZDdjNCIsIm5iZiI6MTc4MTg4Mzc1Ni4zOCwic3ViIjoiNmEzNTYzNmNkNmFlNDM2NTYxNGU2OWY4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.aONiHGWw9yofJW_1yTHcK7zyjDyfWveag7nGXADGo8I'; 

const tmdbApi = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    Accept: 'application/json',
  },
});

export const fetchTrendingMovies = (page = 1) => 
  tmdbApi.get('/trending/movie/week', { params: { page } });

export const searchMovies = (query, page = 1) => 
  tmdbApi.get('/search/movie', { params: { query, page } });

export const fetchMovieDetails = (id) => 
  tmdbApi.get(`/movie/${id}`, { params: { append_to_response: 'similar' } });