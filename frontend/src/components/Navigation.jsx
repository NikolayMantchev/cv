import React, { useState, useEffect } from 'react';
import CV_DATA from '../../../CV_DATA';
import './Navigation.css';

const Navigation = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
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

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
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
  <div class="nav__container">
      
      <button class="header__menu" onclick="toggleMenu()">
<a class="header__logo" href="/" title="manata home">
        
          <img src="/assets/logo-manata.png" alt="manata logo"/>
       

      </a>
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" stroke-width="2px" stroke-linecap="round" d="M 4 12 l 16 0">
            <animate id="to-close-opacity" attributeName="d" calcMode="spline" keySplines="0.42, 0, 0.58, 1"
              values="M 4 12 l 16 0;M 12 12 l 0 0" begin="indefinite" dur="0.3s" fill="freeze" />
            <animate id="to-open-opacity" attributeName="d" calcMode="spline" keySplines="0.42, 0, 0.58, 1"
              values="M 12 12 l 0 0;M 4 12 l 16 0" begin="indefinite" dur="0.3s" fill="freeze" />
          </path>
          <path fill="none" stroke-width="2px" stroke-linecap="round" d="M 4 6 l 16 0 M 4 18 l 16 0">
            <animate id="to-close-d" attributeName="d" calcMode="spline" keySplines="0.42, 0, 0.58, 1"
              values="M 4 6 l 16 0 M 4 18 l 16 0;M 6.35 6.35 l 11.3 11.3 M 6.35 17.45 l 11.3 -11.3" begin="indefinite"
              dur="0.3s" fill="freeze" />
            <animate id="to-open-d" attributeName="d" calcMode="spline" keySplines="0.42, 0, 0.58, 1"
              values="M 6.35 6.35 l 11.3 11.3 M 6.35 17.45 l 11.3 -11.3;M 4 6 l 16 0 M 4 18 l 16 0" begin="indefinite"
              dur="0.3s" fill="freeze" />
          </path>
        </svg>
      </button>
      <nav class="nav bracket bracket--top header__nav header__main">
        <ul class="hoverable__reset">
          <li class="hoverable hoverable--active">
            <a href="/"><span class="hoverable__line">Home</span></a>
          </li>
          <li class="hoverable">
            <a href="/tools/"><span class="hoverable__line">Tools</span></a>
          </li>
          <li class="hoverable">
            <a href="/math/"><span class="hoverable__line">Math</span></a>
          </li>
          <li class="hoverable">
            <a href="/things/"><span class="hoverable__line">Things</span></a>
          </li>
        </ul>
      </nav>
      
      
    </div>
    </nav>
  );
};

export default Navigation;

//<nav
//      className={`navigation ${scrolled ? 'scrolled' : ''}`}
//      role="navigation"
//      aria-label="Main navigation"
//    >
//      <div className="nav-container">
//       
//
//        <ul className="nav-links" role="menubar" aria-orientation="horizontal">
//          {CV_DATA.navItems.map(item => (
//            <p key={item.id}>
//              <button
//                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
//                onClick={() => scrollToSection(item.id)}
//                aria-current={activeSection === item.id ? 'page' : undefined}
//              >
//                <span className="nav-icon">{item.icon}</span>
//                <span className="nav-label">{item.label}</span>
//              </button>
//            </p>
//          ))}
//        </ul>
//      </div>
//    </nav> 