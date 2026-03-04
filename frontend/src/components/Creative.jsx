import React from 'react';
import CV_DATA from '../../../CV_DATA';
import './Creative.css';

const Creative = () => {
  return (
    <section id="creative" className="creative-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Creative
          </h2>
          <div className="section-line"></div>
        </div>

        <div className="creative-grid">
          {CV_DATA.creative.map((item, index) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="creative-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="creative-image">
                <span className="creative-emoji">{item.image}</span>
              </div>
              <div className="creative-content">
                <span className="creative-category">{item.category}</span>
                <h3 className="creative-title">{item.title}</h3>
                <p className="creative-description">{item.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Creative;