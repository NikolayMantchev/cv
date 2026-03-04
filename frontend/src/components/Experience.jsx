import React from 'react';
import CV_DATA from '../../../CV_DATA';
import './Experience.css';

const Experience = () => {
  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Experience
          </h2>
          <div className="section-line"></div>
        </div>

        <div className="experience-content">
          <div className="experience-timeline">
            {CV_DATA.experience.map((job, index) => (
              <div
                key={job.id}
               
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="experience-marker">
                
                 
                </div>
                <div className="experience-card">
                  <div className="experience-header">
                    <div className="company-info">
                      <h3 className="company-name">{job.company}</h3>
                      <h4 className="position">{job.position}</h4>
                    </div>
                    <span className="period">{job.period}</span>
                  </div>
                  <p className="job-description">{job.description}</p>
                  <ul className="achievements">
                    {job.achievements.map((achievement, idx) => (
                      <li key={idx}>
                        <span className="achievement-icon">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;