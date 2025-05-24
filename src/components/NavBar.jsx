import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Movie App 🍿</Link>
      </div>

      {/* Burger Button */}
      <div className="navbar-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Links */}
      <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link
          to="/movies"
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          Movies
        </Link>
        <Link
          to="/series"
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          TV Shows
        </Link>
        <Link
          to="/animes"
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          Anime
        </Link>
        <Link
          to="/favorites"
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          Favorites
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
