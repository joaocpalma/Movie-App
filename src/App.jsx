import { Routes, Route } from 'react-router-dom';
import './css/App.css';
import Favorites from './pages/Favorites';
import NavBar from './components/NavBar';
import { MovieProvider } from './context/MovieContext';
import MovieDetails from './pages/MovieDetails';
import PopularTvShow from './pages/PopularTvShow';
import PopularMovies from './pages/PopularMovies';
import TvShowDetails from './pages/TvShowDetails';
import PopularAnimes from './pages/PopularAnimes';
import Home from './pages/Home';
import AnimeDetails from './pages/AnimeDetails';

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<PopularMovies />} />
          <Route path="/series" element={<PopularTvShow />} />
          <Route path="/animes" element={<PopularAnimes />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/details" element={<MovieDetails />} />
          <Route path="/tvshow/details" element={<TvShowDetails />} />
          <Route path="/anime/details" element={<AnimeDetails />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
