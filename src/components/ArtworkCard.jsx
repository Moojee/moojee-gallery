import React, { useState } from 'react';

/**
 * ArtworkCard Component - การ์ดโชว์เฉพาะภาพ
 * @param {Object} artwork - ข้อมูลผลงาน
 * @param {Function} onClick - ฟังก์ชันที่ถูกเรียกเมื่อคลิกที่การ์ด
 */
const ArtworkCard = ({ artwork, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative cursor-pointer overflow-hidden  shadow-md hover:shadow-lg transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(artwork)}
    >
      {/* รูปภาพผลงาน */}
      <img
        src={artwork.image}
        alt={artwork.title}
        className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
      />

      {/* Overlay ตอน hover */}
      <div
        className={`absolute inset-0 bg-black/35 flex items-center justify-center text-white text-sm tracking-wide uppercase transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        View details
      </div>
    </div>
  );
};

export default ArtworkCard;
