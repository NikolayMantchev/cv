import React from 'react';
import CV_DATA from '../../../CV_DATA';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            About Me
          </h2>
          <div className="section-line"></div>
        </div>

        <div className="about-content">
          <div className="about-text">
            <h3 className="about-headline">{CV_DATA.about.headline}</h3>
            <p className="about-description">
              {CV_DATA.about.description}
            </p>
            <ul className="about-bio">
              {CV_DATA.about.bio.map((item, index) => (
                <li key={index}>
                  <span className="bio-icon">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="about-visual">
            <div className="skill-card">
              <div className="skill-card-header">
                <span className="skill-card-icon">🎯</span>
                <h4 className="skill-card-title">My Focus</h4>
              </div>
              <div className="skill-card-body">
                <p className="skill-card-text">
                  Building scalable, high-performance web applications with modern technologies.
                  Passionate about clean code, intuitive interfaces, and creating exceptional user experiences.
                </p>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-card-header">
                <span className="skill-card-icon">💡</span>
                <h4 className="skill-card-title">Philosophy</h4>
              </div>
              <div className="skill-card-body">
                <p className="skill-card-text">
                  I believe in the power of technology to solve real-world problems.
                  Every line of code I write is designed with the user in mind.
                </p>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-card-header">
                <span className="skill-card-icon">🚀</span>
                <h4 className="skill-card-title">Mission</h4>
              </div>
              <div className="skill-card-body">
                <p className="skill-card-text">
                  To create innovative solutions that push the boundaries of what's possible
                  in web development and AI integration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;