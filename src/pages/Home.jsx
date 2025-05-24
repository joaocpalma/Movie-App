import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import {
  getTrendingMovies,
  getTrendingTvShows,
  getPopularAnimes,
  getMovieDetails,
  getTvSeriesDetails,
  getAnimeDetails,
} from '../services/api';
import { useEffect, useState, useRef } from 'react';
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
    // We define one async loader that fetches all three endpoints in parallel
    const loadAllTrending = async () => {
      try {
        // Kick off all three requests at once
        const [moviesData, tvShowsData, animeData] = await Promise.all([
          getTrendingMovies(),
          getTrendingTvShows(),
          getPopularAnimes(),
        ]);

        setMovies(moviesData);
        setTvShows(tvShowsData);
        setAnime(animeData);
      } catch (err) {
        console.error(err);
        setError('Failed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadAllTrending();
  }, []);

  const handleGetMovieDetails = async (movie) => {
    try {
      const data = await getMovieDetails(movie);
      navigate('/movie/details', { state: { data } });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleGetTvSeriesDetails = async (tvShow) => {
    try {
      const data = await getTvSeriesDetails(tvShow);
      navigate('/tvshow/details', { state: { data } });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleGetAnimeDetails = async (animeItem) => {
    try {
      const data = await getAnimeDetails(animeItem);
      navigate('/anime/details', { state: { data } });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (loading) return <p className="loading">Loading upcoming movies...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="movie-grid">
      <div>
        <div className="carousel-wrapper">
          <Swiper
            modules={[Autoplay]}
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            speed={8000}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="full-width-swiper"
          >
            {movies.map((movie, index) => (
              <SwiperSlide key={index} className="full-width-slide">
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
      <div>
        <div className="carousel-wrapper">
          <Swiper
            modules={[Autoplay]}
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            speed={8000}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="full-width-swiper"
          >
            {tvShows.map((tvShow, index) => (
              <SwiperSlide key={index} className="full-width-slide">
                <div
                  className="movie-slide"
                  onClick={() => handleGetTvSeriesDetails(tvShow)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w780${tvShow.backdrop_path}`}
                    alt={tvShow.name}
                    className="movie-image"
                  />
                  <div className="movie-info">
                    <h3 className="movie-title">{tvShow.name}</h3>
                    <p>{tvShow.first_air_date?.split('-')[0]}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div>
        <div className="carousel-wrapper">
          <Swiper
            modules={[Autoplay]}
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            speed={8000}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="full-width-swiper"
          >
            {anime.map((animeItem, index) => (
              <SwiperSlide key={index} className="full-width-slide">
                <div
                  className="movie-slide"
                  onClick={() => handleGetAnimeDetails(animeItem)}
                >
                  <img
                    src={animeItem.images.jpg.large_image_url}
                    alt={animeItem.title}
                    className="movie-image"
                  />
                  <div className="movie-info">
                    <h3 className="movie-title">{animeItem.title}</h3>
                    <p>{animeItem.aired.from?.split('-')[0]}</p>
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
