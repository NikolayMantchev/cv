import { useState } from 'react';
import { RiAwardLine } from 'react-icons/ri';
import CV_DATA from '../../../CV_DATA';
import './Education.css';

const CertModal = ({ cert, onClose }) => {
  if (!cert) return null;
  return (
    <div className="cert-modal-overlay" onClick={onClose}>
      <div className="cert-modal" onClick={e => e.stopPropagation()}>
        <button className="cert-modal-close" onClick={onClose}>✕</button>
        <div className="cert-modal-header">
          <span className="cert-modal-issuer">{cert.issuer}</span>
          <h2 className="cert-modal-name">{cert.name}</h2>
          <div className="cert-modal-meta">
            <span className="cert-modal-gpa">Grade: {cert.gpa}</span>
            {cert.hours && <span className="cert-modal-hours">{cert.hours}h studied</span>}
            <span className="cert-modal-date">Issued: {cert.issued}</span>
          </div>
        </div>
        {cert.topics && (
          <div className="cert-modal-topics">
            <h4 className="cert-modal-topics-title">Topics Covered</h4>
            <ul className="cert-modal-topics-list">
              {cert.topics.map((topic, i) => (
                <li key={i}>{topic}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const Education = () => {
  const [activeCert, setActiveCert] = useState(null);
  return (
    <>
      <section id="education" className="education-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Education</h2>
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
                  <button
                    key={cert.id}
                    className="certification-item"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setActiveCert(cert)}
                  >
                    <div className="certification-icon"><RiAwardLine /></div>
                    <div className="certification-content">
                      <h4 className="certification-name">{cert.name}</h4>
                      <p className="certification-issuer">{cert.issuer}</p>
                      <p className="certification-period">{cert.period}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />
    </>
  );
};

export default Education;