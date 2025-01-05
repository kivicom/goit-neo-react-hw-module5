import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={styles.list}>
      {movies.map(({ id, title, poster_path, vote_average }) => {
        const posterUrl = poster_path
          ? `https://image.tmdb.org/t/p/w300${poster_path}`
          : 'https://via.placeholder.com/300x450?text=No+Poster';

        return (
          <li key={id} className={styles.item}>
            <Link
              to={`/movies/${id}`}
              state={{ from: location }}
              className={styles.link}
            >
              <img src={posterUrl} alt={title} className={styles.poster} />
              <div className={styles.movieInfo}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.rating}>
                  Rating: {vote_average.toFixed(1)}
                </p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
