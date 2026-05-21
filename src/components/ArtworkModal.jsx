import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const ArtworkModal = ({ artwork, onClose, artworks = [] }) => {
  const [isIn, setIsIn] = useState(false);

  useEffect(() => {
    if (artwork) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => setIsIn(true), 20);
    }
    return () => {
      document.body.style.overflow = '';
      setIsIn(false);
    };
  }, [artwork]);

  if (!artwork) return null;

  const currentIndex = artworks.findIndex((a) => a.id === artwork.id);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400&display=swap');

        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(20, 18, 16, 0);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          transition: background 0.4s ease, backdrop-filter 0.4s ease;
          backdrop-filter: blur(0px);
          -webkit-backdrop-filter: blur(0px);
        }
        .modal-backdrop.in {
          background: rgba(20, 18, 16, 0.75);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .modal-box {
          background: #f6f4f2;
          max-width: 960px;
          width: 100%;
          max-height: 90vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          opacity: 0;
          transform: translateY(20px) scale(0.97);
          transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          overflow: hidden;
          position: relative;
        }
        .modal-box.in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        @media (max-width: 640px) {
          .modal-box {
            grid-template-columns: 1fr;
            max-height: 95vh;
            overflow-y: auto;
          }
        }

        .modal-img-side {
          background: #ede9e4;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          max-height: 90vh;
        }
        .modal-img-side img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          max-height: 90vh;
        }

        .modal-info-side {
          padding: 3rem 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-left: 1px solid rgba(47, 42, 38, 0.1);
        }

        .modal-label {
          font-family: 'Jost', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #c9a96e;
          margin-bottom: 1rem;
        }

        .modal-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          font-size: 2.2rem;
          line-height: 1.1;
          color: #2f2a26;
          margin: 0 0 0.5rem;
        }

        .modal-rule {
          width: 32px; height: 1px;
          background: #c9a96e;
          margin: 1.2rem 0;
        }

        .modal-meta {
          font-family: 'Jost', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          color: #9a8e84;
          margin-bottom: 1.5rem;
        }

        .modal-desc {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem;
          font-style: italic;
          line-height: 1.75;
          color: #5a5248;
        }

        .modal-close {
          position: absolute;
          top: 1.2rem;
          right: 1.2rem;
          background: rgba(47, 42, 38, 0.06);
          border: none;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #5a5248;
          transition: background 0.2s, color 0.2s;
          z-index: 10;
        }
        .modal-close:hover {
          background: #2f2a26;
          color: #f6f4f2;
        }

        .modal-nav {
          display: flex;
          gap: 0.5rem;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(47, 42, 38, 0.1);
        }

        .modal-nav-btn {
          font-family: 'Jost', sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          background: transparent;
          border: 1px solid rgba(47, 42, 38, 0.2);
          color: #7a6e65;
          padding: 0.5rem 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          transition: all 0.25s;
        }
        .modal-nav-btn:hover {
          background: #2f2a26;
          color: #f6f4f2;
          border-color: #2f2a26;
        }

        .modal-index {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.85rem;
          color: rgba(47, 42, 38, 0.3);
          margin-top: auto;
          padding-top: 1.5rem;
        }
      `}</style>

      <div
        className={`modal-backdrop ${isIn ? 'in' : ''}`}
        onClick={onClose}
      >
        <div
          className={`modal-box ${isIn ? 'in' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose}>
            <X size={16} strokeWidth={1.5} />
          </button>

          <div className="modal-img-side">
            <img src={artwork.image} alt={artwork.title} />
          </div>

          <div className="modal-info-side">
            <p className="modal-label">From the Collection</p>
            <h2 className="modal-title">{artwork.title}</h2>
            <div className="modal-rule" />
            <p className="modal-meta">
              {artwork.medium}{artwork.year ? ` · ${artwork.year}` : ''}
            </p>
            <p className="modal-desc">{artwork.description}</p>

            {artworks.length > 1 && (
              <div className="modal-nav">
                {currentIndex > 0 && (
                  <button className="modal-nav-btn">
                    <ChevronLeft size={12} /> Prev
                  </button>
                )}
                {currentIndex < artworks.length - 1 && (
                  <button className="modal-nav-btn">
                    Next <ChevronRight size={12} />
                  </button>
                )}
              </div>
            )}

            {currentIndex !== -1 && (
              <p className="modal-index">
                {currentIndex + 1} / {artworks.length}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtworkModal;