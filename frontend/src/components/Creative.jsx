import { useState } from 'react';
import CV_DATA from '../../../CV_DATA';
import './Creative.css';

const GalleryModal = ({ item, onClose }) => {
  const [activeImg, setActiveImg] = useState(0);
  if (!item) return null;
  const imgs = item.images;
  return (
    <div className="cert-modal-overlay" onClick={onClose}>
      <div className="creative-modal" onClick={e => e.stopPropagation()}>
        <button className="cert-modal-close" onClick={onClose}>✕</button>
        <div className="cert-modal-header">
          <span className="cert-modal-issuer">{item.category}</span>
          <h2 className="cert-modal-name">{item.title}</h2>
        </div>
        <div className="creative-modal-main-img">
          <img src={imgs[activeImg]} alt={`${item.title} ${activeImg + 1}`} />
        </div>
        <div className="creative-modal-thumbs">
          {imgs.map((src, i) => (
            <button
              key={i}
              className={`creative-modal-thumb${i === activeImg ? ' active' : ''}`}
              onClick={() => setActiveImg(i)}
            >
              <img src={src} alt={`${item.title} ${i + 1}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Creative = () => {
  const [galleryItem, setGalleryItem] = useState(null);

  return (
    <>
      <section id="creative" className="creative-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Creative</h2>
            <div className="section-line"></div>
          </div>

          <div className="creative-grid">
            {CV_DATA.creative.map((item, index) => {
              const hasGallery = item.images && item.images.length > 0;
              const CardTag = hasGallery ? 'button' : 'a';
              const cardProps = hasGallery
                ? { onClick: () => setGalleryItem(item) }
                : { href: item.link, target: '_blank', rel: 'noopener noreferrer' };

              return (
                <CardTag
                  key={item.id}
                  {...cardProps}
                  className="creative-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="creative-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="creative-content">
                    <span className="creative-category">{item.category}</span>
                    <h3 className="creative-title">{item.title}</h3>
                    <p className="creative-description">{item.description}</p>
                  </div>
                </CardTag>
              );
            })}
          </div>
        </div>
      </section>

      <GalleryModal item={galleryItem} onClose={() => setGalleryItem(null)} />
    </>
  );
};

export default Creative;