import TvShowCard from '../components/TvShowCard';
import { useState, useEffect } from 'react';
import { searchTvShows, getPopularTvShows } from '../services/api';
import '../css/PopularTvShow.css';

function PopularSeries() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tvshow, setTvShow] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularTvShows = async () => {
      try {
        const popularTvShow = await getPopularTvShows();
        setTvShow(popularTvShow);
      } catch (err) {
        console.log(err);
        setError('Failed to load tv shows...');
      } finally {
        setLoading(false);
      }
    };
    loadPopularTvShows();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);
    try {
      const searchResults = await searchTvShows(searchQuery);
      setTvShow(searchResults);
      setError(null);
    } catch (error) {
      console.log(error);
      setError('Failed to search Tv Show...');
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
          placeholder="Search for Tv Show..."
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
          {tvshow.map((tvshow) => (
            <TvShowCard tvshow={tvshow} key={tvshow.id} />
          ))}
        </div>
    </div>
  );
}

export default PopularSeries;
