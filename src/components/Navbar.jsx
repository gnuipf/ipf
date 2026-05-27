import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoHome from '../assets/img/inau-bg.png';
import logoDb from '../assets/img/nuke-bg.png';
import './Navbar.css';

const NAV_ITEMS = [
  { path: '/', label: 'INÍCIO' },
  { path: '/sobre', label: 'SOBRE NÓS' },
  { path: '/seja-revisor', label: 'SEJA REVISOR' },
  { path: '/db', label: 'NUKE DB' },
];

export default function Navbar() {
  const location = useLocation();
  const [menuOpenPath, setMenuOpenPath] = useState(null);
  const menuOpen = menuOpenPath === location.pathname;

  const getLinkClass = (path) =>
    location.pathname === path ? 'nav-link active' : 'nav-link';

  const getLogo = () => (location.pathname === '/db' ? logoDb : logoHome);

  const closeMenu = () => setMenuOpenPath(null);
  const toggleMenu = () =>
    setMenuOpenPath(menuOpen ? null : location.pathname);

  useEffect(() => {
    document.body.classList.toggle('nav-menu-open', menuOpen);
    return () => document.body.classList.remove('nav-menu-open');
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <nav className="navbar" aria-label="Principal">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo-link" onClick={closeMenu}>
          <img src={getLogo()} alt="Inaudível Por Favor" className="navbar-logo" />
        </Link>

        <div className="nav-links nav-links--desktop">
          {NAV_ITEMS.map(({ path, label }) => (
            <Link key={path} className={getLinkClass(path)} to={path}>
              {label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className={`nav-hamburger${menuOpen ? ' is-open' : ''}`}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="nav-mobile-menu"
          onClick={toggleMenu}
        >
          <span className="nav-hamburger-bar" aria-hidden="true" />
          <span className="nav-hamburger-bar" aria-hidden="true" />
          <span className="nav-hamburger-bar" aria-hidden="true" />
        </button>
      </div>

      <button
        type="button"
        className={`nav-backdrop${menuOpen ? ' is-visible' : ''}`}
        aria-hidden={!menuOpen}
        tabIndex={menuOpen ? 0 : -1}
        onClick={closeMenu}
      />

      <div
        id="nav-mobile-menu"
        className={`nav-drawer${menuOpen ? ' is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <p className="nav-drawer-title cinzel">Menu</p>
        <div className="nav-links nav-links--mobile">
          {NAV_ITEMS.map(({ path, label }) => (
            <Link
              key={path}
              className={getLinkClass(path)}
              to={path}
              onClick={closeMenu}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
