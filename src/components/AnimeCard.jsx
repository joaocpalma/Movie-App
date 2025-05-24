import '../css/AnimeCard.css';
import { useMovieContext } from '../context/MovieContext';

function AnimeCard({ anime }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(anime.mal_id);

  function onFavoriteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) removeFromFavorites(anime.id);
    else addToFavorites(anime);
  }

  const handleGetMovieDetails = async (e) => {
    alert(e);
  };

  return (
    <div className="movie-card">
      <div
        onClick={() => handleGetMovieDetails(anime)}
        className="movie-poster"
      >
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          className="movie-image"
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
        <h3>{anime.title}</h3>
        <p>{anime.aired.from?.split('-')[0]}</p>
      </div>
    </div>
  );
}

export default AnimeCard;
