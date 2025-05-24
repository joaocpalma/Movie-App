import '../css/AnimeCard.css';
import { useMovieContext } from '../context/MovieContext';
import { getAnimeDetails } from '../services/api';
import { useNavigate } from 'react-router-dom';

function AnimeCard({ anime }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const itemWithType = { ...anime, type: 'anime', id: anime.mal_id };
  const favorite = isFavorite(itemWithType);

  function onFavoriteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) removeFromFavorites(itemWithType);
    else addToFavorites(itemWithType);
  }

  const navigate = useNavigate();

  const handleGetAnimeDetails = async (e) => {
    try {
      const data = await getAnimeDetails(e);

      navigate('/anime/details', { state: { data } });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="anime-card">
      <div
        onClick={() => handleGetAnimeDetails(anime)}
        className="anime-poster"
      >
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          className="anime-image"
        />
        <div className="anime-overlay">
          <button
            className={`favorite-btn ${favorite ? 'active' : ''}`}
            onClick={onFavoriteClick}
          >
            ♥
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{anime.title}</h3>
        <p>{anime.aired.from?.split('-')[0]}</p>
      </div>
    </div>
  );
}

export default AnimeCard;
