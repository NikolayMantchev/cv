import React from 'react';
import CV_DATA from '../../../CV_DATA';
import './Hero.css';

const Hero = ({ onNavigate }) => {
  const handleClick = () => {
    onNavigate();
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h2 className="hero-greeting">Hello, I'm Nikolay</h2>
          <h1 className="hero-name">{CV_DATA.personal.name}</h1>
          <h2 className="hero-title">{CV_DATA.personal.title}</h2>
          <p className="hero-description">
            Full Stack JavaScript Web Developer passionate about building intelligent digital experiences. I specialize in creating innovative solutions that bridge the gap between technology and user needs. Let's explore how I can bring your ideas to life!
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={handleClick}>
              Explore My Work
              <span className="btn-icon">↓</span>
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => scrollToSection('contact')}
            >
              Get In Touch
            </button>
          </div>

          <div className="hero-socials">
            {CV_DATA.socialLinks.slice(0, 4).map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social"
                aria-label={social.label}
              >
                <span>{social.icon}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="code-block">
            <div className="code-header">
              <div className="code-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="code-title">main.jsx</span>
            </div>
            <pre className="code-content">
              <code>
                <span className="code-keyword">import</span> {`{`}React{`} from`} 'react'
                <br />
                <span className="code-keyword">import</span> {`{`}ReactDOM{`} from`} 'react-dom'
                <br />
                <span className="code-keyword">import</span> App {`from`} './App'
                <br />
                <br />
                {`ReactDOM.`}createRoot(
                <br />
                {`  document.`}getElementById('root')
                <br />
                ).render(
                <br />
                {`  <App />`}
                <br />
                )
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;