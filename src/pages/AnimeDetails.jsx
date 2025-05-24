import { useState } from 'react';
import '../css/AnimeDetails.css';
import { Link, useLocation } from 'react-router-dom';

function AnimeDetails() {
  const location = useLocation();
  const anime = location.state?.data;
  const [showTrailerModal, setShowTrailerModal] = useState(false);

  if (!anime) {
    return <p>No data available.</p>;
  }

  function formatRuntime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }

  return (
    <>
      <Link className="return-link" to={'/animes'}>
        👈 Back
      </Link>
      <div className="movie-details">
        <div>
          <img
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            className="movie-image"
          />
        </div>
        <div className="movie-meta">
          <h3>{anime.title}</h3>
          <div className="meta-info">
            <span className="meta-item release-year">
              Release: {anime.aired.from?.split('T')[0]}
            </span>
            <span className="meta-item status">Status: {anime.status}</span>
            <span className="meta-item runtime">
              Episodes: {anime.episodes}
            </span>
            <span className="meta-item rating">⭐ {anime.score}</span>
          </div>
          <span>{anime.synopsis}</span>
        </div>
        <button onClick={() => setShowTrailerModal(true)}>Watch Trailer</button>
        {showTrailerModal && (
          <div
            className="modal-overlay"
            onClick={() => setShowTrailerModal(false)}
          >
            <iframe
              src={anime.trailer.embed_url}
              className="trailer-iframe"
              frameBorder="0"
              allowFullScreen
              title="Anime Trailer"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default AnimeDetails;
