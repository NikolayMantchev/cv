import { useState, useEffect, useRef } from 'react';
import CV_DATA from '../../../CV_DATA';
import logoManata from '../assets/logo-manata.png';
import toggleThemeVideo from '../assets/DARK MODE LIGHT MODE.webm';
import './Navigation.css';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const themeVideoRef = useRef(null);

  const firstHalfRef = useRef(true);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    const video = themeVideoRef.current;
    if (video) {
      const half = video.duration / 2;
      const playingFirstHalf = firstHalfRef.current;
      video.currentTime = playingFirstHalf ? 0 : half;
      video.play();
      const stopAt = playingFirstHalf ? half : video.duration;
      const onTime = () => {
        if (video.currentTime >= stopAt) {
          video.pause();
          video.removeEventListener('timeupdate', onTime);
        }
      };
      video.addEventListener('timeupdate', onTime);
      firstHalfRef.current = !playingFirstHalf;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll('section');
      const navHeight = 180;

      sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight / 2;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      setMenuOpen(false);
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <nav
      className={`navigation ${scrolled ? 'scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <button
        className="header__menu"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        <img src={logoManata} alt="Logo" />
      </button>

      <button
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(prev => !prev)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        <span className="hamburger__line" />
        <span className="hamburger__line" />
        <span className="hamburger__line" />
      </button>

      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <video
          ref={themeVideoRef}
          className="theme-toggle-video"
          src={toggleThemeVideo}
          muted
          playsInline
        />
      </button>

      <ul className={`nav-links ${menuOpen ? 'active' : ''}`} role="menubar" aria-orientation="horizontal">
        {CV_DATA.navItems.map(item => (
          <li key={item.id} role="none">
            <button
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
              aria-current={activeSection === item.id ? 'page' : undefined}
            >
              <span className="nav-label">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
