import '../css/TvShowCard.css';
import { useMovieContext } from '../context/MovieContext';
import { getTvSeriesDetails } from '../services/api';
import { useNavigate } from 'react-router-dom';

function TvShowCard({ tvshow }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(tvshow.id);

  const navigate = useNavigate();

  function onFavoriteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) removeFromFavorites(tvshow.id);
    else addToFavorites(tvshow);
  }

  const handleGetTvSeriesDetails = async (e) => {
    try {
      const data = await getTvSeriesDetails(e);

      navigate('/tvshow/details', { state: { data } });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="tvshow-card">
      <div
        onClick={() => handleGetTvSeriesDetails(tvshow)}
        className="tvshow-poster"
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${tvshow.poster_path}`}
          alt={tvshow.title}
        />
        <div className="tvshow-overlay">
          <button
            className={`favorite-btn ${favorite ? 'active' : ''}`}
            onClick={onFavoriteClick}
          >
            ♥
          </button>
        </div>
      </div>
      <div className="tvshow-info">
        <h3>{tvshow.name}</h3>
        <p>{tvshow.first_air_date?.split('-')[0]}</p>
      </div>
    </div>
  );
}

export default TvShowCard;
