import React from 'react';

const Footer = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400&family=Jost:wght@300;400&display=swap');

        .footer-section {
          background: #1e1b18;
          padding: 3rem 0;
          border-top: 1px solid rgba(201,169,110,0.15);
        }

        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-logo {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 1rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(246,244,242,0.5);
        }

        .footer-note {
          font-family: 'Jost', sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          color: rgba(201,169,110,0.5);
          text-align: center;
        }

        .footer-copy {
          font-family: 'Jost', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          color: rgba(246,244,242,0.25);
        }
      `}</style>

      <footer className="footer-section">
        <div className="footer-inner">
          <span className="footer-logo">Moojee</span>
          <p className="footer-note">
            ขอบคุณที่เยี่ยมชมค่ะ ♡
          </p>
          <span className="footer-copy">
            © {new Date().getFullYear()} Sutita. All rights reserved.
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;