import React, { useState, useEffect, useRef } from "react";
import green from "../assets/art/S__39247888_0.jpg";

const Hero = ({ onExploreClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 12,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 8,
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        .hero-section {
          background-color: #f6f4f2;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }

        /* Subtle grain texture */
        .hero-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          opacity: 0.4;
          pointer-events: none;
          z-index: 0;
        }

        .hero-eyebrow {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 0.65rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #c9a96e;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
        }

        .hero-eyebrow.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-title-line {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(3.5rem, 8vw, 6.5rem);
          line-height: 0.92;
          color: #2f2a26;
          letter-spacing: -0.01em;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 1s ease, transform 1s ease;
          display: block;
        }

        .hero-title-line.italic {
          font-style: italic;
          color: #5a5248;
          font-weight: 300;
        }

        .hero-title-line.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-divider {
          width: 40px;
          height: 1px;
          background: #c9a96e;
          opacity: 0;
          transition: opacity 0.8s ease 0.7s, width 0.8s ease 0.7s;
        }

        .hero-divider.visible {
          opacity: 1;
          width: 56px;
        }

        .hero-body {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          font-weight: 400;
          line-height: 1.8;
          color: #7a6e65;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.8s ease 0.9s, transform 0.8s ease 0.9s;
          max-width: 380px;
        }

        .hero-body.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .explore-btn {
          font-family: 'Jost', sans-serif;
          font-weight: 400;
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #2f2a26;
          background: transparent;
          border: 1px solid rgba(47, 42, 38, 0.35);
          padding: 0.85rem 2.2rem;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: color 0.4s ease, border-color 0.4s ease;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.8s ease 1.1s, transform 0.8s ease 1.1s, color 0.4s ease, background 0.4s ease, border-color 0.4s ease;
        }

        .explore-btn.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .explore-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #2f2a26;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1);
          z-index: 0;
        }

        .explore-btn:hover::before {
          transform: scaleX(1);
        }

        .explore-btn:hover {
          color: #f6f4f2;
          border-color: #2f2a26;
        }

        .explore-btn span {
          position: relative;
          z-index: 1;
        }

        .hero-image-wrapper {
          opacity: 0;
          transform: translateY(24px) scale(0.98);
          transition: opacity 1.2s ease 0.4s, transform 1.2s ease 0.4s;
        }

        .hero-image-wrapper.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .hero-image-frame {
          position: relative;
        }

        /* Museum-style frame edge */
        .hero-image-frame::before {
          content: '';
          position: absolute;
          inset: -12px;
          border: 1px solid rgba(201, 169, 110, 0.2);
          pointer-events: none;
          z-index: 2;
        }

        .hero-image-frame::after {
          content: '';
          position: absolute;
          inset: -6px;
          border: 1px solid rgba(201, 169, 110, 0.12);
          pointer-events: none;
          z-index: 2;
        }

        .hero-image-frame img {
          display: block;
          width: 100%;
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .hero-image-frame:hover img {
          transform: scale(1.03);
        }

        .hero-scroll-hint {
          font-family: 'Jost', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #c9a96e;
          writing-mode: vertical-rl;
          opacity: 0;
          animation: heroScrollFade 1s ease 2s forwards;
        }

        @keyframes heroScrollFade {
          to { opacity: 0.7; }
        }

        .scroll-line {
          width: 1px;
          height: 0;
          background: linear-gradient(to bottom, #c9a96e, transparent);
          animation: heroLineGrow 1.5s ease 2.2s forwards;
        }

        @keyframes heroLineGrow {
          to { height: 48px; }
        }

        .hero-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.7rem;
          color: rgba(47, 42, 38, 0.2);
          letter-spacing: 0.1em;
        }
      `}</style>

      <section
        ref={heroRef}
        className="hero-section"
        onMouseMove={handleMouseMove}
      >
        {/* Warm gradient wash */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '50%',
            height: '100%',
            background: 'radial-gradient(ellipse at 70% 30%, rgba(201,169,110,0.07) 0%, transparent 65%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* Left scroll indicator */}
          {!isMobile && (
            <div
              style={{
                position: 'absolute',
                left: '-0.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <span className="hero-scroll-hint">Moojee</span>
              <div className="scroll-line" />
            </div>
          )}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '3rem' : '5rem',
              alignItems: 'center',
              width: '100%',
              paddingTop: '5rem',
              paddingBottom: '4rem',
            }}
          >
            {/* Text content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <p className={`hero-eyebrow ${isVisible ? 'visible' : ''}`}>
                Personal Collection · 2024
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1em' }}>
                <span
                  className={`hero-title-line ${isVisible ? 'visible' : ''}`}
                  style={{ transitionDelay: '0.3s' }}
                >
                  Moojee
                </span>
                <span
                  className={`hero-title-line italic ${isVisible ? 'visible' : ''}`}
                  style={{ transitionDelay: '0.5s' }}
                >
                  Art Gallery
                </span>
              </div>

              <div className={`hero-divider ${isVisible ? 'visible' : ''}`} />

              <p className={`hero-body ${isVisible ? 'visible' : ''}`}>
                A place to collect the moments I painted for fun, and to practice web design along the way.
              </p>

              <div>
                <button
                  onClick={onExploreClick}
                  className={`explore-btn ${isVisible ? 'visible' : ''}`}
                >
                  <span>View Collection</span>
                </button>
              </div>
            </div>

            {/* Image */}
            <div
              className={`hero-image-wrapper ${isVisible ? 'visible' : ''}`}
              style={{
                transform: isVisible
                  ? `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`
                  : 'translateY(24px)',
                transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1.2s ease 0.4s',
              }}
            >
              <div className="hero-image-frame" style={{ overflow: 'hidden' }}>
                <img
                  src={green}
                  alt="Moojee gallery hero artwork"
                  style={{
                    transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)`,
                    transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                  loading="eager"
                />
              </div>

              {/* Caption below image */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '1rem',
                  padding: '0 0.25rem',
                }}
              >
                <span className="hero-number">Green — Dept, 2024</span>
                <span className="hero-number">Canvas, Acrylic</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;