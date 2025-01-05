import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h2>404 - Page not found</h2>
      <Link to="/">Go Home</Link>
    </div>
  );
}
