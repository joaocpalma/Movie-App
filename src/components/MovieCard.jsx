import '../css/MovieCard.css';
import { useMovieContext } from '../context/MovieContext';
import { getMovieDetails } from '../services/api';
import { useNavigate } from 'react-router-dom';

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  const navigate = useNavigate();

  function onFavoriteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  const handleGetMovieDetails = async (e) => {
    try {
      const data = await getMovieDetails(e);

      navigate('/movie/details', { state: { data } });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="movie-card">
      <div
        onClick={() => handleGetMovieDetails(movie)}
        className="movie-poster"
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? 'active' : ''}`}
            onClick={onFavoriteClick}
          >
            ♥
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split('-')[0]}</p>
      </div>
    </div>
  );
}

export default MovieCard;
