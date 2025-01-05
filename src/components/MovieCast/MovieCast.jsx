import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from '../../services/tmdbAPI';
import styles from './MovieCast.module.css';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCast() {
      setLoading(true);
      setError(false);
      try {
        const data = await getMovieCast(movieId);

        if (!data || !data.cast) {
          setError(true);
          toast.info('No cast information available.');
          setCast([]);
          return;
        }

        if (data.cast.length === 0) {
          toast.info('No cast information available for this movie.');
          setCast([]);
          return;
        }

        // Иначе всё ок
        setCast(data.cast);
      } catch (error) {
        console.error('Error loading cast:', error);
        setError(true);
        toast.error('Failed to load cast. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchCast();
  }, [movieId]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className={styles.errorText}>No cast information available.</p>;
  }

  if (cast.length === 0) {
    return <p className={styles.noCast}>No cast information available.</p>;
  }

  return (
    <ul className={styles.castList}>
      {cast.map(actor => {
        const { id, name, character, profile_path } = actor;
        const profileURL = profile_path
          ? `https://image.tmdb.org/t/p/w200${profile_path}`
          : 'https://via.placeholder.com/200x300?text=No+Photo';

        return (
          <li key={id} className={styles.castItem}>
            <img src={profileURL} alt={name} className={styles.profilePic} />
            <div className={styles.actorInfo}>
              <p className={styles.actorName}>{name}</p>
              <p className={styles.character}>
                <span>Character: </span>
                {character || '—'}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
