import AnimeCard from '../components/AnimeCard';
import { useState, useEffect, useRef } from 'react';
import {
  getPopularAnimes,
  getUpcomingAnimes,
  searchAnime,
} from '../services/api';
import '../css/PopularAnimes.css';

function PopularAnimes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [anime, setAnime] = useState([]);
  const [searchedAnime, setSearchedAnime] = useState([]);
  const [upcomingAnime, setUpcomingAnime] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('popular');

  const didFetchAnime = useRef(false);

  const uniqueByMalId = (arr) =>
    Array.from(new Map(arr.map((item) => [item.mal_id, item])).values());

  useEffect(() => {
    if (didFetchAnime.current) return;
    didFetchAnime.current = true;

    const loadTrendingAnime = async () => {
      try {
        const trending = await getPopularAnimes();
        const upcoming = await getUpcomingAnimes();
        setAnime(uniqueByMalId(trending));
        setUpcomingAnime(uniqueByMalId(upcoming));
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
      setSearchedAnime(searchResults);
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
      <button
        className={
           searchedAnime.length === 0 && activeFilter === 'popular' ? 'filter-button active' : 'filter-button'
        }
        onClick={() => {
          setActiveFilter('popular');
          setSearchedAnime([]);
        }}
      >
        Most Popular
      </button>
      <button
        className={
          searchedAnime.length === 0 && activeFilter === 'upcoming' ? 'filter-button active' : 'filter-button'
        }
        onClick={() => {
          setActiveFilter('upcoming');
          setSearchedAnime([]);
        }}
      >
        Top Upcoming
      </button>
      <br />
      {error && <div className="error-message">{error}</div>}

      <div className="tvshow-grid">
        {searchedAnime.length > 0
          ? searchedAnime.map((anime) => (
              <AnimeCard anime={anime} key={anime.mal_id} />
            ))
          : activeFilter === 'popular'
          ? anime.map((anime) => <AnimeCard anime={anime} key={anime.mal_id} />)
          : upcomingAnime.map((anime) => (
              <AnimeCard anime={anime} key={anime.mal_id} />
            ))}
      </div>
    </div>
  );
}

export default PopularAnimes;
