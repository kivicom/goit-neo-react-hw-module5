import { useEffect, useState, Suspense } from 'react';
import {
  useParams,
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { getMovieDetails } from '../../services/tmdbAPI';
import styles from './MovieDetailsPage.module.css';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(false);
    setMovie(null);

    async function fetchDetails() {
      try {
        const data = await getMovieDetails(movieId);

        if (
          !data ||
          data.success === false ||
          data.status_code === 34 ||
          data.status_code === 404
        ) {
          setError(true);
          toast.error(
            data?.message || 'Movie not found. Please try another link.'
          );

          setLoading(false);
          return;
        }

        setMovie(data);
      } catch (err) {
        console.error(err);
        setError(true);
        toast.error('Failed to fetch movie. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [movieId]);

  const goBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate('/movies');
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className={styles.errorMessage}>No movie found. Try another link.</p>
    );
  }

  if (!movie) {
    return <p>No data.</p>;
  }

  const { title, poster_path, overview, genres, vote_average } = movie;
  const posterURL = poster_path
    ? `https://image.tmdb.org/t/p/w300${poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Poster';

  return (
    <div className={styles.container}>
      <button type="button" onClick={goBack} className={styles.backButton}>
        Go back
      </button>

      <div className={styles.movieInfo}>
        <img src={posterURL} alt={title} className={styles.poster} />
        <div className={styles.textInfo}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.overview}>
            <strong>Overview:</strong> {overview}
          </p>
          <p className={styles.rating}>
            <strong>Rating:</strong> {vote_average?.toFixed(1)}
          </p>
          {genres && (
            <p className={styles.genres}>
              <strong>Genres:</strong> {genres.map(g => g.name).join(', ')}
            </p>
          )}
        </div>
      </div>

      <div className={styles.links}>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to="cast" state={location.state}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={location.state}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
