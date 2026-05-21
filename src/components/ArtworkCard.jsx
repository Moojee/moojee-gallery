import React, { useState, useRef, useEffect } from 'react';

const ArtworkCard = ({ artwork, onClick, index = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 80);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400&family=Jost:wght@300;400&display=swap');

        .artwork-card {
          cursor: pointer;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
          background: #fff;
        }
        .artwork-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .artwork-img-wrap {
          overflow: hidden;
          position: relative;
          background: #ede9e4;
          aspect-ratio: 3/4;
        }
        .artwork-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .artwork-card:hover .artwork-img-wrap img {
          transform: scale(1.05);
        }

        .artwork-overlay {
          position: absolute;
          inset: 0;
          background: rgba(47, 42, 38, 0);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 1.5rem;
          transition: background 0.4s ease;
        }
        .artwork-card:hover .artwork-overlay {
          background: rgba(47, 42, 38, 0.45);
        }

        .overlay-text {
          font-family: 'Jost', sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #f6f4f2;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .artwork-card:hover .overlay-text {
          opacity: 1;
          transform: translateY(0);
        }

        .card-meta {
          padding: 0.9rem 0 0.4rem;
          border-top: 1px solid rgba(47, 42, 38, 0.08);
        }
        .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          font-size: 1rem;
          color: #2f2a26;
          margin: 0 0 0.2rem;
        }
        .card-medium {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #9a8e84;
          margin: 0;
        }
      `}</style>

      <div
        ref={cardRef}
        className={`artwork-card ${isVisible ? 'visible' : ''}`}
        onClick={() => onClick(artwork)}
      >
        <div className="artwork-img-wrap">
          <img src={artwork.image} alt={artwork.title} loading="lazy" />
          <div className="artwork-overlay">
            <span className="overlay-text">View Work</span>
          </div>
        </div>
        <div className="card-meta">
          <p className="card-title">{artwork.title}</p>
          <p className="card-medium">{artwork.medium}</p>
        </div>
      </div>
    </>
  );
};

export default ArtworkCard;