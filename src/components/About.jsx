import React, { useEffect, useRef, useState } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400&display=swap');

        .about-section {
          background: #2f2a26;
          padding: 7rem 0;
          position: relative;
          overflow: hidden;
        }

        .about-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #c9a96e 30%, #e8d5b7 50%, #c9a96e 70%, transparent);
        }

        .about-quote-mark {
          font-family: 'Cormorant Garamond', serif;
          font-size: 8rem;
          line-height: 0.6;
          color: rgba(201,169,110,0.15);
          user-select: none;
          position: absolute;
          top: 4rem;
          left: 2rem;
        }

        .about-eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #c9a96e;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s;
        }
        .about-eyebrow.visible { opacity: 1; transform: translateY(0); }

        .about-heading {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(2rem, 4vw, 3rem);
          color: #f6f4f2;
          margin: 0.5rem 0 0;
          letter-spacing: -0.01em;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.8s ease 0.25s, transform 0.8s ease 0.25s;
        }
        .about-heading.visible { opacity: 1; transform: translateY(0); }

        .about-rule {
          width: 36px; height: 1px;
          background: #c9a96e;
          margin: 1.5rem 0;
          opacity: 0;
          transition: opacity 0.6s ease 0.4s;
        }
        .about-rule.visible { opacity: 1; }

        .about-body {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem;
          line-height: 1.9;
          color: rgba(246, 244, 242, 0.7);
          max-width: 540px;
          opacity: 0;
          transform: translateY(10px);
        }
        .about-body.p1 { transition: opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s; }
        .about-body.p2 { transition: opacity 0.8s ease 0.65s, transform 0.8s ease 0.65s; }
        .about-body.p3 {
          font-style: italic;
          color: rgba(201,169,110,0.8);
          transition: opacity 0.8s ease 0.8s, transform 0.8s ease 0.8s;
        }
        .about-body.visible { opacity: 1; transform: translateY(0); }
      `}</style>

      <section className="about-section" id="about" ref={ref}>
        <div className="about-quote-mark">&ldquo;</div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '640px' }}>
            <p className={`about-eyebrow ${isVisible ? 'visible' : ''}`}>About the Artist</p>
            <h2 className={`about-heading ${isVisible ? 'visible' : ''}`}>A little corner<br />on the web</h2>
            <div className={`about-rule ${isVisible ? 'visible' : ''}`} />
            <p className={`about-body p1 ${isVisible ? 'visible' : ''}`}>
              Thanks for stopping by my little art gallery. I love painting and creating visual things — just for fun, not too seriously.
            </p>
            <br />
            <p className={`about-body p2 ${isVisible ? 'visible' : ''}`}>
              I didn't design every piece here from scratch, but I found inspiration from beautiful artworks and visuals I've come across. This website is a small space for me to learn and practice web design while exploring what I love about colors, shapes, and emotions.
            </p>
            <br />

          </div>
        </div>
      </section>
    </>
  );
};

export default About;