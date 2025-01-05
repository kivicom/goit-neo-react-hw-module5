import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../services/tmdbAPI';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import styles from './HomePage.module.css';
import { toast } from 'react-toastify';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchTrending() {
      setLoading(true);
      setError(false);
      try {
        const data = await getTrendingMovies();

        if (!data || !data.results || data.results.length === 0) {
          setError(true);
          toast.info('No trending movies found at the moment.');
          setMovies([]);
          return;
        }
        setMovies(data.results);
      } catch (err) {
        console.error('Error fetching trending movies:', err);
        setError(true);
        toast.error('Failed to load trending movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchTrending();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className={styles.errorMessage}>Failed to fetch trending movies.</p>
    );
  }

  if (movies.length === 0) {
    return <p className={styles.noMovies}>No trending movies found.</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Trending Movies Today</h2>
      <MovieList movies={movies} />
    </div>
  );
}
