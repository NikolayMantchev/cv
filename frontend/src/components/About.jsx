import React from 'react';
import CV_DATA from '../../../CV_DATA';
import { Icon } from '../utils/icons';
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
                  <span className="bio-icon"><Icon name="check" /></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="about-visual">
            <div className="skill-card">
              <div className="skill-card-header">
                <span className="skill-card-icon"><Icon name="focus" /></span>
                <h4 className="skill-card-title">My Focus</h4>
              </div>
              <div className="skill-card-body">
                <p className="skill-card-text">
                  Full-stack development from database to deployment — with a designer's eye for detail.
                  I care about interfaces that feel as good as they work.
                </p>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-card-header">
                <span className="skill-card-icon"><Icon name="philosophy" /></span>
                <h4 className="skill-card-title">Philosophy</h4>
              </div>
              <div className="skill-card-body">
                <p className="skill-card-text">
                  Technology is only useful when it solves real problems for real people.
                  Running my own business taught me that — and I bring that mindset to every project.
                </p>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-card-header">
                <span className="skill-card-icon"><Icon name="mission" /></span>
                <h4 className="skill-card-title">Mission</h4>
              </div>
              <div className="skill-card-body">
                <p className="skill-card-text">
                  To build products that are technically solid, visually clean, and genuinely useful —
                  combining full-stack expertise with a creative background few developers have.
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