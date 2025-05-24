import '../css/MovieDetails.css';
import { useLocation } from 'react-router-dom';

function MovieDetails() {
  const location = useLocation();
  const movie = location.state?.data;

  if (!movie) {
    return <p>No data available.</p>;
  }

  function formatRuntime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }

  return (
    <div className="movie-details">
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div className="movie-meta">
        <h3>{movie.title}</h3>
        <div className="meta-info">
          <span className="meta-item release-year">
            {movie.release_date?.split('-')[0]}
          </span>
          <span className="meta-item status">Status: {movie.status}</span>
          <span className="meta-item runtime">
            Runtime: {formatRuntime(movie.runtime)}
          </span>
          <span className="meta-item rating">⭐ {movie.vote_average}</span>
        </div>
        <span>{movie.overview}</span>
      </div>
    </div>
  );
}

export default MovieDetails;
