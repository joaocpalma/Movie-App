import '../css/TvShowDetails.css';
import { useLocation } from 'react-router-dom';

function TvShowDetails() {
  const location = useLocation();
  const tvshow = location.state?.data;

  if (!tvshow) {
    return <p>No data available.</p>;
  }

  return (
    <div className="movie-details">
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${tvshow.poster_path}`}
          alt={tvshow.title}
        />
      </div>
      <div className="movie-meta">
        <h3>{tvshow.name}</h3>
        <div className="meta-info">
          <span className="meta-item release-year">
            {tvshow.first_air_date?.split('-')[0]}
          </span>
          <span className="meta-item status">Status: {tvshow.status}</span>
          <span className="meta-item runtime">
            Seasons: {tvshow.number_of_seasons}
          </span>
          <span className="meta-item rating">⭐ {tvshow.vote_average}</span>
        </div>
        <span>{tvshow.overview}</span>
      </div>
    </div>
  );
}

export default TvShowDetails;
