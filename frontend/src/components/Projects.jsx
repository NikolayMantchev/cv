import React from 'react';
import CV_DATA from '../../../CV_DATA';
import './Projects.css';

const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Projects
          </h2>
          <div className="section-line"></div>
        </div>

        <div className="projects-grid">
          {CV_DATA.projects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card ${project.featured ? 'featured' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="project-image">
                <span className="project-emoji">{project.id % 3 === 1 ? '🚀' : project.id % 3 === 2 ? '⚙️' : '🎨'}</span>
              </div>
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-name">{project.name}</h3>
                  <span className="project-tag featured">Featured</span>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="technology-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link primary"
                    >
                      View Project
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github ? `${CV_DATA.personal.github}` : project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link secondary"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;