import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

/**
 * Navigation Component - แถบเมนูด้านบน
 * @param {Boolean} isMenuOpen - สถานะการเปิด/ปิดเมนูมือถือ
 * @param {Function} setIsMenuOpen - ฟังก์ชันเปลี่ยนสถานะเมนู
 */
const Navigation = ({ isMenuOpen, setIsMenuOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // ตรวจสอบการเลื่อนหน้าจอเพื่อเปลี่ยนสไตล์ navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between max-w-6xl mx-auto px-6 py-4">
        {/* โลโก้/ชื่อ */}
        <div className="text-2xl font-bold text-gray-500">  </div>

        {/* เมนูสำหรับหน้าจอใหญ่ */}
        <div className="hidden md:flex gap-8 text-gray-500 font-medium">
          <a href="#portfolio" className="hover:text-black transition-colors">
            Art
          </a>
          <a href="#about" className="hover:text-black transition-colors">
            About
          </a>

        </div>

        {/* ปุ่มเมนูสำหรับมือถือ */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* เมนูมือถือแบบเต็มหน้าจอ */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md py-6 flex flex-col items-center gap-4 text-gray-700 shadow-lg">
          <a href="#portfolio" onClick={() => setIsMenuOpen(false)}>
            Art
          </a>
          <a href="#about" onClick={() => setIsMenuOpen(false)}>
            About
          </a>
     
        </div>
      )}
    </nav>
  );
};

export default Navigation;
