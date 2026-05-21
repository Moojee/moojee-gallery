import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = ({ isMenuOpen, setIsMenuOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@300;400;500&display=swap');

        .nav-link {
          font-family: 'Jost', sans-serif;
          font-weight: 400;
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #5a5248;
          text-decoration: none;
          position: relative;
          transition: color 0.3s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 1px;
          background: #2f2a26;
          transition: width 0.35s ease;
        }

        .nav-link:hover {
          color: #2f2a26;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-logo {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 1.1rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #2f2a26;
          text-decoration: none;
        }

        .nav-wrapper {
          background: rgba(246, 244, 242, 0.97);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(47, 42, 38, 0.08);
        }

        .nav-wrapper.transparent {
          background: transparent;
          border-bottom: 1px solid transparent;
        }

        .mobile-menu {
          background: #f6f4f2;
          border-top: 1px solid rgba(47, 42, 38, 0.1);
          animation: slideDown 0.3s ease forwards;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .nav-divider {
          width: 1px;
          height: 12px;
          background: rgba(47, 42, 38, 0.2);
        }

        .menu-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #5a5248;
          padding: 4px;
          transition: color 0.2s;
        }

        .menu-btn:hover {
          color: #2f2a26;
        }
      `}</style>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 nav-wrapper ${
          !isScrolled ? 'transparent' : ''
        }`}
      >
        {/* Top thin accent bar */}
        <div style={{ height: '2px', background: 'linear-gradient(90deg, #c9a96e 0%, #e8d5b7 50%, #c9a96e 100%)' }} />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem',
            height: '64px',
          }}
        >
          {/* Logo */}
          <a href="#" className="nav-logo">Moojee</a>

          {/* Desktop nav */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: '2.5rem' }}>
            <a href="#portfolio" className="nav-link">Collection</a>
            <div className="nav-divider" />
            <a href="#about" className="nav-link">About</a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="menu-btn md:hidden"
          >
            {isMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="mobile-menu md:hidden">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
                padding: '2rem 0',
              }}
            >
              <a href="#portfolio" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Collection
              </a>
              <a href="#about" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                About
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;