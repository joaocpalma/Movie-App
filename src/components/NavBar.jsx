import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Navbar.css';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink className={"brand-highlight"} to="/">Next2Watch 🍿</NavLink>
      </div>

      {/* Burger Button */}
      <div className="navbar-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation Links */}
      <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `nav-link${isActive ? ' active' : ''}`
          }
          onClick={() => setMenuOpen(false)}
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            `nav-link${isActive ? ' active' : ''}`
          }
          onClick={() => setMenuOpen(false)}
        >
          Movies
        </NavLink>
        <NavLink
          to="/series"
          className={({ isActive }) =>
            `nav-link${isActive ? ' active' : ''}`
          }
          onClick={() => setMenuOpen(false)}
        >
          TV Shows
        </NavLink>
        <NavLink
          to="/animes"
          className={({ isActive }) =>
            `nav-link${isActive ? ' active' : ''}`
          }
          onClick={() => setMenuOpen(false)}
        >
          Anime
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `nav-link${isActive ? ' active' : ''}`
          }
          onClick={() => setMenuOpen(false)}
        >
          Favorites
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
