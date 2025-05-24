import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import {
  getTrendingMovies,
  getTrendingTvShows,
  getMovieDetails,
  getTvSeriesDetails,
  getPopularAnimes,
} from '../services/api';
import { useEffect, useState, useRef  } from 'react';
import '../css/Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [anime, setAnime] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const didFetchAnime = useRef(false);

  useEffect(() => {
    const loadTrendingMovies = async () => {
      try {
        const upcoming = await getTrendingMovies();
        setMovies(upcoming);
      } catch (err) {
        console.error(err);
        setError('Failed to load movies...');
      } finally {
        setLoading(false);
      }
    };
    loadTrendingMovies();
  }, []);

  useEffect(() => {
    const loadTrendingTvShows = async () => {
      try {
        const upcoming = await getTrendingTvShows();
        setTvShows(upcoming);
      } catch (err) {
        console.error(err);
        setError('Failed to load Tv Shows...');
      } finally {
        setLoading(false);
      }
    };
    loadTrendingTvShows();
  }, []);

  useEffect(() => {
    if (didFetchAnime.current) return;
    didFetchAnime.current = true;

    const loadTrendingAnime = async () => {
      try {
        const upcoming = await getPopularAnimes();
        setAnime(upcoming);
      } catch (err) {
        console.error(err);
        setError('Failed to load Tv Shows...');
      } finally {
        setLoading(false);
      }
    };
    loadTrendingAnime();
  }, []);

  const handleGetMovieDetails = async (e) => {
    try {
      const data = await getMovieDetails(e);

      navigate('/movie/details', { state: { data } });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleGetTvSeriesDetails = async (e) => {
    try {
      const data = await getTvSeriesDetails(e);

      navigate('/tvshow/details', { state: { data } });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (loading) return <p className="loading">Loading upcoming movies...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="movie-grid">
      <div className="movie-card">
        <h2 className="section-title">Trending Movies</h2>
        <div className="carousel-wrapper">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
          >
            {movies.map((movie, index) => (
              <SwiperSlide key={index}>
                <div
                  className="movie-slide"
                  onClick={() => handleGetMovieDetails(movie)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                    alt={movie.title}
                    className="movie-image"
                  />
                  <div className="movie-info">
                    <h3 className="movie-title">{movie.title}</h3>
                    <p>{movie.release_date?.split('-')[0]}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="movie-card">
        <h2 className="section-title">Trending Shows</h2>
        <div className="carousel-wrapper">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
          >
            {tvShows.map((tvShows, index) => (
              <SwiperSlide key={index}>
                <div
                  className="movie-slide"
                  onClick={() => handleGetTvSeriesDetails(tvShows)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w780${tvShows.backdrop_path}`}
                    alt={tvShows.title}
                    className="movie-image"
                  />
                  <div className="movie-info">
                    <h3 className="movie-title">{tvShows.name}</h3>
                    <p>{tvShows.first_air_date?.split('-')[0]}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="movie-card">
        <h2 className="section-title">Trending Anime</h2>
        <div className="carousel-wrapper">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
          >
            {anime.map((anime, index) => (
              <SwiperSlide key={index}>
                <div
                  className="movie-slide"
                >
                  <img
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title}
                    className="movie-image"
                  />
                  <div className="movie-info">
                    <h3 className="movie-title">{anime.title}</h3>
                    <p>{anime.aired.from?.split('-')[0]}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Home;
