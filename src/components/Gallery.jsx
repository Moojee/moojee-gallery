import React from 'react';
import ArtworkCard from './ArtworkCard';
import { artworks } from '../data/artworks';

/**
 * Gallery Component - กริดแสดงผลงานทั้งหมด
 * @param {Function} onArtworkClick - ฟังก์ชันที่ถูกเรียกเมื่อคลิกที่ผลงาน
 */
const Gallery = ({ onArtworkClick }) => {
  return (
    <section className="py-20 bg-gray-50" id="portfolio">
      <div className="max-w-6xl mx-auto px-6">
        {/* หัวข้อส่วนแสดงผลงาน */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Art
        </h2>

        {/* Grid Layout สำหรับแสดงผลงาน */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {artworks.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              onClick={onArtworkClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
