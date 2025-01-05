// src/components/MovieReviews/MovieReviews.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../services/tmdbAPI';
import styles from './MovieReviews.module.css';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      setError(false);

      try {
        const data = await getMovieReviews(movieId);

        if (!data || !data.results) {
          setError(true);
          toast.info('No reviews found for this movie.');
          setReviews([]);
          return;
        }

        if (data.results.length === 0) {
          toast.info('No reviews found for this movie.');
          setReviews([]);
          return;
        }

        setReviews(data.results);
      } catch (err) {
        console.error('Error loading reviews:', err);
        setError(true);
        toast.error('Failed to load reviews. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [movieId]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className={styles.errorText}>No reviews found.</p>;
  }

  if (reviews.length === 0) {
    return <p className={styles.noReviews}>No reviews found for this movie.</p>;
  }

  return (
    <ul className={styles.reviewsList}>
      {reviews.map(review => {
        const { id, author, content } = review;
        return (
          <li key={id} className={styles.reviewItem}>
            <h4 className={styles.author}>Author: {author}</h4>
            <p className={styles.content}>{content}</p>
          </li>
        );
      })}
    </ul>
  );
}
