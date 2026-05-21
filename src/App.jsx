import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ArtworkModal from './components/ArtworkModal';
import './App.css';


function App() {
  // State สำหรับควบคุมเมนูมือถือ
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // State สำหรับควบคุม Modal แสดงรายละเอียดผลงาน
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  /**
   * ฟังก์ชันเลื่อนไปยังส่วนผลงาน
   */
  const scrollToGallery = () => {
    // id="portfolio" 
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /**
   * ฟังก์ชันเปิด Modal แสดงรายละเอียดผลงาน
   */
  const handleArtworkClick = (artwork) => {
    setSelectedArtwork(artwork);
  };

  /**
   * ฟังก์ชันปิด Modal
   */
  const handleCloseModal = () => {
    setSelectedArtwork(null);
  };

  return (
    <>
      {/* แถบเมนูนำทาง */}
      <Navigation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* ส่วน Hero */}
      <Hero onExploreClick={scrollToGallery} />

      {/* ส่วนแสดงผลงาน */}
      <Gallery onArtworkClick={handleArtworkClick} />

      {/* ส่วนเกี่ยวกับศิลปิน */}
      <About />



      {/* ส่วนท้าย */}
      <Footer />

      {/* Modal แสดงรายละเอียดผลงาน */}
      {selectedArtwork && (
        <ArtworkModal
          artwork={selectedArtwork}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default App;
