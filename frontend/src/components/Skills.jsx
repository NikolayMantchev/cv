import { useState } from 'react';
import CV_DATA from '../../../CV_DATA';
import { Icon } from '../utils/icons';
import './Skills.css';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const skillCategories = [
    { id: 'frontend',      name: 'Frontend',       icon: 'tab_frontend' },
    { id: 'backend',       name: 'Backend',        icon: 'tab_backend' },
    { id: 'grafik_design', name: 'Graphic Design', icon: 'tab_design' },
    { id: 'devops',        name: 'DevOps',         icon: 'tab_devops' }
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Skills</h2>
          <div className="section-line"></div>
        </div>

        <div className="skills-content">
          <div className="category-tabs">
            {skillCategories.map(category => (
              <button
                key={category.id}
                className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="tab-icon"><Icon name={category.icon} /></span>
                <span className="tab-name">{category.name}</span>
              </button>
            ))}
          </div>

          <div className="skills-display">
            <div className="skills-grid">
              {CV_DATA.skills[activeCategory].map((skill, index) => (
                <div
                  key={skill.name}
                  className="skill-item"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="skill-header">
                    <span className="skill-icon"><Icon name={skill.icon} /></span>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-progress"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <span className="skill-level">{skill.level}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
