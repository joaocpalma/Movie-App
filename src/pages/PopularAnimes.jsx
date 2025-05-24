import AnimeCard from '../components/AnimeCard';
import { useState, useEffect, useRef } from 'react';
import { getPopularAnimes, searchAnime } from '../services/api';
import '../css/PopularAnimes.css';

function PopularAnimes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [anime, setAnime] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const didFetchAnime = useRef(false);

  useEffect(() => {
    if (didFetchAnime.current) return;
    didFetchAnime.current = true;

    const loadTrendingAnime = async () => {
      try {
        const upcoming = await getPopularAnimes();
        setAnime(upcoming);
      } catch (err) {
        console.error(err);
        setError('Failed to load Anime...');
      } finally {
        setLoading(false);
      }
    };
    loadTrendingAnime();
  }, []);

  const handleSearch = async (e) => {
      e.preventDefault();
      if (!searchQuery.trim()) return;
      if (loading) return;
      setLoading(true);
      try {
        const searchResults = await searchAnime(searchQuery);
        setAnime(searchResults);
        setError(null);
      } catch (error) {
        console.log(error);
        setError('Failed to search Animes...');
      } finally {
        setLoading(false);
      }
  
      setSearchQuery('');
    };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for Anime..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      
        <div className="tvshow-grid">
          {anime.map((anime) => (
            <AnimeCard anime={anime} key={anime.mal_id} />
          ))}
        </div>
    </div>
  );
}

export default PopularAnimes;
