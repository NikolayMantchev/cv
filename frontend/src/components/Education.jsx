import CV_DATA from '../../../CV_DATA';
import './Education.css';

const Education = () => {
  return (
    <section id="education" className="education-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Education
          </h2>
          <div className="section-line"></div>
        </div>

        <div className="education-content">
          <div className="education-timeline">
            {CV_DATA.education.map((education, index) => (
              <div
                key={education.id}
                className="education-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
               
                <div className="education-card">
                  <div className="education-header">
                    <h3 className="institution">{education.institution}</h3>
                    <span className="education-gpa">{education.gpa ? `GPA: ${education.gpa}` : ''}</span>
                  </div>
                  <h4 className="degree">{education.degree}</h4>
                  <p className="period">{education.period}</p>
                  <p className="education-description">{education.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="certifications">
            <h3 className="certifications-title">Certifications</h3>
            <div className="certifications-grid">
              {CV_DATA.certifications.map((cert, index) => (
                <div
                  key={cert.id}
                  className="certification-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="certification-icon">🏆</div>
                  <div className="certification-content">
                    <h4 className="certification-name">{cert.name}</h4>
                    <div>
                      <p className="certification-issuer">{cert.issuer}</p>
                    </div>
                    <p className="certification-period">{cert.period}</p>
                    <p className="certification-topics">{cert.topics ? cert.topics.join(', ') : '' }</p>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;