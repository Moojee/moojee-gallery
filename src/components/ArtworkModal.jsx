import React from 'react';
import { X } from 'lucide-react';

/**
 * ArtworkModal Component - หน้าต่างแสดงรายละเอียดผลงาน
 * @param {Object} artwork - ข้อมูลผลงานที่จะแสดง
 * @param {Function} onClose - ฟังก์ชันปิด modal
 */
const ArtworkModal = ({ artwork, onClose }) => {
  if (!artwork) return null;

  return (
    // พื้นหลังโปร่งแสงครอบทั้งหน้า (backdrop)
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      {/* กล่องเนื้อหา modal */}
      <div
        className="relative bg-white rounded-xl shadow-lg max-w-6xl w-full grid md:grid-cols-2 gap-8 p-6 animate-fadeIn"
        onClick={(e) => e.stopPropagation()} // ป้องกันคลิกในกล่องแล้ว modal ปิด
      >
        {/* ปุ่มปิด */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black transition"
        >
          <X size={24} />
        </button>

        {/* รูปภาพผลงาน */}
        <div className="flex justify-center items-center">
          <img
            src={artwork.image}
            alt={artwork.title}
            className="rounded-lg object-cover max-h-[70vh] w-full"
          />

          
        </div>

        {/* รายละเอียดผลงาน */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">
            {artwork.title}
          </h2>
          <p className="text-gray-500 mb-4">
            {artwork.medium} • {artwork.year}
          </p>
          <p className="text-gray-700 leading-relaxed">{artwork.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ArtworkModal;
