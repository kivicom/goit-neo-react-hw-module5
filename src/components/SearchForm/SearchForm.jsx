import { useState } from 'react';
import styles from './SearchForm.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SearchForm({ initialQuery = '', onSubmit }) {
  const [query, setQuery] = useState(initialQuery);

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      return toast.warning('Please enter something to start your search');
    }
    onSubmit(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <input
        type="text"
        name="search"
        value={query}
        onChange={handleChange}
        placeholder="Enter movie name"
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>
        Search
      </button>
    </form>
  );
}
