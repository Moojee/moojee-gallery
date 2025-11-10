import React, { useState } from 'react';

/**
 * ArtworkCard Component - การ์ดแสดงผลงานแต่ละชิ้น
 * @param {Object} artwork - ข้อมูลผลงาน
 * @param {Function} onClick - ฟังก์ชันที่ถูกเรียกเมื่อคลิกที่การ์ด
 */
const ArtworkCard = ({ artwork, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(artwork)}
    >
      {/* รูปภาพผลงาน */}
      <img
        src={artwork.image}
        alt={artwork.title}
        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Overlay ที่ปรากฏเมื่อ hover */}
      <div
        className={`absolute inset-0 bg-black/40 flex items-center justify-center text-white text-lg font-semibold transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        ดูรายละเอียด
      </div>

      {/* ข้อมูลผลงาน */}
      <div className="p-4 bg-white">
        <h3 className="text-lg font-semibold text-gray-800">{artwork.title}</h3>
        <p className="text-sm text-gray-500">
          {artwork.medium} • {artwork.year}
        </p>
      </div>
    </div>
  );
};

export default ArtworkCard;
