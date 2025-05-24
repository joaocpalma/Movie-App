import '../css/Favorites.css';
import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import AnimeCard from '../components/AnimeCard';
import TvShowCard from '../components/TvShowCard';

function Favorites() {
  const { favorites } = useMovieContext();

  const uniqueFavorites = favorites.map((item) => ({
    ...item,
    uniqueId: `${item.type}-${item.id}`,
  }));

  return (
    <>
      {uniqueFavorites.length > 0 ? (
        <div className="favorites">
          <h2>Your Favorites</h2>
          <div className="movies-grid">
            {uniqueFavorites.map((item) => {
              const { uniqueId } = item;
              if (item.type === 'anime') {
                return <AnimeCard anime={item} key={uniqueId} />;
              } else if (item.type === 'movie') {
                return <MovieCard movie={item} key={uniqueId} />;
              } else if (item.type === 'tvshow') {
                return <TvShowCard tvshow={item} key={uniqueId} />;
              } else {
                return null;
              }
            })}
          </div>
        </div>
      ) : (
        <div className="favorites-empty">
          <h2>No favorites yet</h2>
          <p>
            Start adding items to your favorites, and they will appear here.
          </p>
        </div>
      )}
    </>
  );
}

export default Favorites;
