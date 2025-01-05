import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { searchMovies } from '../../services/tmdbAPI';
import MovieList from '../../components/MovieList/MovieList';
import SearchForm from '../../components/SearchForm/SearchForm';
import Loader from '../../components/Loader/Loader';

import 'react-toastify/dist/ReactToastify.css';
import styles from './MoviesPage.module.css';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    setLoading(true);
    async function fetchMovies() {
      try {
        const data = await searchMovies(query);
        if (!data.results || data.results.length === 0) {
          toast.info('There are no results for this request.');
          setMovies([]);
          return;
        }
        setMovies(data.results);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [query]);

  const handleSearchSubmit = value => {
    setSearchParams({ query: value });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Search Movies</h2>
      <SearchForm initialQuery={query} onSubmit={handleSearchSubmit} />
      {loading && <Loader />}
      <MovieList movies={movies} />
    </div>
  );
}
