import React, { useState, useEffect, useRef } from 'react';
import { artworks } from '../data/artworks';

/* ── tiny hook: fires once when element enters viewport ── */
const useReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, visible];
};

/* ── Single museum row ── */
const MuseumRow = ({ artwork, index, onClick }) => {
  const [ref, visible] = useReveal(0.12);
  const isEven = index % 2 === 0;   // even → image left | odd → image right
  const isDark  = index % 4 >= 2;   // groups of 4: rows 2-3 get dark bg

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        .mrow {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 72vh;
          opacity: 0;
          transform: translateY(52px);
          transition: opacity 0.95s cubic-bezier(0.16,1,0.3,1),
                      transform 0.95s cubic-bezier(0.16,1,0.3,1);
        }
        .mrow.visible { opacity: 1; transform: translateY(0); }

        @media (max-width: 768px) {
          .mrow { grid-template-columns: 1fr; min-height: auto; }
        }

        /* — image cell — */
        .mrow-img {
          overflow: hidden;
          position: relative;
          background: #ddd8d0;
          cursor: pointer;
        }
        .mrow-img img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform 1s cubic-bezier(0.25,0.46,0.45,0.94),
                      filter 0.6s ease;
          filter: brightness(0.96) saturate(0.9);
        }
        .mrow-img:hover img {
          transform: scale(1.05);
          filter: brightness(1.02) saturate(1.05);
        }
        .mrow-img-overlay {
          position: absolute; inset: 0;
          background: rgba(20,17,14,0);
          display: flex; align-items: flex-end;
          padding: 2rem;
          transition: background 0.45s ease;
          pointer-events: none;
        }
        .mrow-img:hover .mrow-img-overlay {
          background: rgba(20,17,14,0.38);
        }
        .mrow-img-overlay-label {
          font-family: 'Jost', sans-serif;
          font-size: 0.58rem; letter-spacing: 0.24em;
          text-transform: uppercase; color: #f6f4f2;
          border-bottom: 1px solid rgba(246,244,242,0.4);
          padding-bottom: 3px;
          opacity: 0; transform: translateY(8px);
          transition: opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s;
        }
        .mrow-img:hover .mrow-img-overlay-label {
          opacity: 1; transform: translateY(0);
        }

        /* — text cell — */
        .mrow-text {
          display: flex; flex-direction: column;
          justify-content: center;
          padding: 5rem 5rem;
          background: #f6f4f2;
          position: relative; overflow: hidden;
        }
        .mrow-text.dark { background: #2f2a26; }

        @media (max-width: 1024px) {
          .mrow-text { padding: 3.5rem 3rem; }
        }
        @media (max-width: 768px) {
          .mrow-text { padding: 2.5rem 1.75rem; }
        }

        /* big ghost number */
        .mrow-num {
          position: absolute; right: 1.5rem; bottom: 1rem;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(5rem,10vw,9rem); font-weight: 300; line-height: 1;
          color: rgba(47,42,38,0.045); user-select: none;
          transition: color 0s;
        }
        .mrow-text.dark .mrow-num { color: rgba(246,244,242,0.045); }

        /* text pieces */
        .mrow-medium {
          font-family: 'Jost', sans-serif;
          font-size: 0.57rem; letter-spacing: 0.3em;
          text-transform: uppercase; color: #c9a96e;
          margin-bottom: 1.1rem;
        }
        .mrow-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(1.9rem, 3vw, 2.9rem);
          line-height: 1.06; color: #2f2a26;
          margin: 0;
        }
        .mrow-text.dark .mrow-title { color: #f6f4f2; }
        .mrow-title em { font-style: italic; color: #9a8e84; }
        .mrow-text.dark .mrow-title em { color: rgba(246,244,242,0.45); }

        .mrow-rule {
          width: 28px; height: 1px;
          background: #c9a96e;
          margin: 1.5rem 0;
          flex-shrink: 0;
        }
        .mrow-desc {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 1.05rem;
          line-height: 1.78; color: #7a6e65; max-width: 310px;
        }
        .mrow-text.dark .mrow-desc { color: rgba(246,244,242,0.48); }

        .mrow-cta {
          margin-top: 2.2rem;
          font-family: 'Jost', sans-serif;
          font-size: 0.58rem; letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #2f2a26; background: transparent;
          border: 1px solid rgba(47,42,38,0.28);
          padding: 0.7rem 1.6rem;
          cursor: pointer; align-self: flex-start;
          display: inline-flex; align-items: center; gap: 0.6rem;
          position: relative; overflow: hidden;
          transition: color 0.38s, border-color 0.38s;
        }
        .mrow-text.dark .mrow-cta {
          color: rgba(246,244,242,0.65);
          border-color: rgba(246,244,242,0.18);
        }
        .mrow-cta::before {
          content:''; position:absolute; inset:0;
          background:#2f2a26;
          transform:scaleX(0); transform-origin:left;
          transition:transform 0.38s cubic-bezier(0.76,0,0.24,1);
        }
        .mrow-text.dark .mrow-cta::before { background:rgba(255,255,255,0.08); }
        .mrow-cta:hover::before { transform:scaleX(1); }
        .mrow-cta:hover { color:#f6f4f2; border-color:#2f2a26; }
        .mrow-text.dark .mrow-cta:hover { color:#f6f4f2; border-color:rgba(246,244,242,0.3); }
        .mrow-cta-inner { position:relative; z-index:1; display:flex; align-items:center; gap:0.6rem; }

        /* separator */
        .mrow-sep {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,169,110,0.2) 20%, rgba(201,169,110,0.2) 80%, transparent);
        }
      `}</style>

      <div
        ref={ref}
        className={`mrow${visible ? ' visible' : ''}`}
        style={{ direction: isEven ? 'ltr' : 'rtl' }}
      >
        {/* Image */}
        <div className="mrow-img" style={{ direction: 'ltr' }} onClick={() => onClick(artwork)}>
          <img src={artwork.image} alt={artwork.title} loading="lazy" />
          <div className="mrow-img-overlay">
            <span className="mrow-img-overlay-label">View Work</span>
          </div>
        </div>

        {/* Text */}
        <div
          className={`mrow-text${isDark ? ' dark' : ''}`}
          style={{ direction: 'ltr' }}
        >
          <span className="mrow-num">{String(index + 1).padStart(2, '0')}</span>
          <p className="mrow-medium">{artwork.medium}</p>
          <h3 className="mrow-title">
            {artwork.title.includes(' ')
              ? <>{artwork.title.split(' ').slice(0,-1).join(' ')} <em>{artwork.title.split(' ').slice(-1)}</em></>
              : <em>{artwork.title}</em>
            }
          </h3>
          <div className="mrow-rule" />
          <p className="mrow-desc">{artwork.description}</p>
          <button className="mrow-cta" onClick={() => onClick(artwork)}>
            <span className="mrow-cta-inner">View artwork <span>→</span></span>
          </button>
        </div>
      </div>

      <div className="mrow-sep" />
    </>
  );
};

/* ── Gallery ── */
const Gallery = ({ onArtworkClick }) => {
  const [filter, setFilter] = useState('All');
  const [headerRef, headerVis] = useReveal(0.2);

  const mediums  = ['All', ...new Set(artworks.map(a => a.medium.trim()))];
  const filtered = filter === 'All'
    ? artworks
    : artworks.filter(a => a.medium.trim() === filter);

  return (
    <>
      <style>{`
        .gallery-section { background: #f0ede9; }

        .gallery-top-rule {
          height: 2px;
          background: linear-gradient(90deg, transparent, #c9a96e 30%, #e8d5b7 50%, #c9a96e 70%, transparent);
        }

        .gallery-header {
          padding: 7rem 2rem 4rem;
          max-width: 1200px; margin: 0 auto;
          opacity: 0; transform: translateY(22px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .gallery-header.visible { opacity:1; transform:translateY(0); }

        .gallery-eyebrow {
          font-family:'Jost',sans-serif; font-weight:300;
          font-size:0.62rem; letter-spacing:0.3em;
          text-transform:uppercase; color:#c9a96e;
          display:block; margin-bottom:0.75rem;
        }
        .gallery-heading {
          font-family:'Cormorant Garamond',serif; font-weight:300;
          font-size:clamp(2.2rem,5vw,3.5rem);
          color:#2f2a26; margin:0 0 0.5rem; letter-spacing:-0.01em;
        }
        .gallery-subhead {
          font-family:'Cormorant Garamond',serif;
          font-style:italic; font-size:1.05rem; color:#7a6e65;
        }
        .gallery-rule { width:48px; height:1px; background:#c9a96e; margin:1.5rem 0; }

        .filter-wrap { padding:0 2rem 3rem; max-width:1200px; margin:0 auto; }
        .filter-bar  { display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:1rem; }
        .filter-pill {
          font-family:'Jost',sans-serif; font-size:0.6rem; letter-spacing:0.15em;
          text-transform:uppercase; padding:0.45rem 1.1rem;
          border:1px solid rgba(47,42,38,0.2); background:transparent; color:#7a6e65;
          cursor:pointer; transition:all 0.25s ease;
        }
        .filter-pill:hover,.filter-pill.active {
          background:#2f2a26; color:#f6f4f2; border-color:#2f2a26;
        }
        .gallery-count {
          font-family:'Jost',sans-serif; font-size:0.58rem; letter-spacing:0.15em;
          text-transform:uppercase; color:#9a8e84;
        }
      `}</style>

      <section className="gallery-section" id="portfolio">
        <div className="gallery-top-rule" />

        <div ref={headerRef} className={`gallery-header${headerVis ? ' visible' : ''}`}>
          <span className="gallery-eyebrow">Works on Paper &amp; Canvas</span>
          <h2 className="gallery-heading">The Collection</h2>
          <div className="gallery-rule" />
          <p className="gallery-subhead">Paintings made for the joy of making.</p>
        </div>

        <div className="filter-wrap">
          <div className="filter-bar">
            {mediums.map(m => (
              <button key={m}
                className={`filter-pill${filter === m ? ' active' : ''}`}
                onClick={() => setFilter(m)}>
                {m}
              </button>
            ))}
          </div>
          <p className="gallery-count">{filtered.length} works</p>
        </div>

        {filtered.map((artwork, i) => (
          <MuseumRow
            key={artwork.id}
            artwork={artwork}
            index={i}
            onClick={onArtworkClick}
          />
        ))}
      </section>
    </>
  );
};

export default Gallery;