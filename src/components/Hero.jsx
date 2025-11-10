import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const Hero = ({ onExploreClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [strokes, setStrokes] = useState([]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // ลบ stroke เก่าออกเรื่อยๆ ไม่ให้เยอะเกิน
  useEffect(() => {
    if (strokes.length > 40) {
      setStrokes((prev) => prev.slice(prev.length - 40));
    }
  }, [strokes]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // เพิ่มจุดแปรงใหม่
    setStrokes((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        x,
        y,
      },
    ]);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className={`relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-[#f7f2ed] text-center transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* แปรงสีตามเมาส์ */}
      <div className="pointer-events-none absolute inset-0">
        {strokes.map((stroke) => (
          <span
            key={stroke.id}
            style={{
              left: stroke.x - 80, // ขยับให้จุดอยู่กลาง
              top: stroke.y - 80,
            }}
            className="absolute w-40 h-28 rounded-[999px] bg-[radial-gradient(circle_at_center,_rgba(223,194,160,0.65),_rgba(247,242,237,0))] rotate-[8deg] blur-md animate-brush"
          />
        ))}
      </div>

      {/* เนื้อหา */}
      <h1 className="relative text-5xl font-bold mb-4 text-[#3b342f] z-10">
        Moojee Gallery Art
      </h1>
      <p className="relative text-lg text-[#6e6158] mb-8 z-10 max-w-xl">
        พื้นที่ความทรงจำที่มีความสุขทุกครั้งที่ได้ลองวาดภาพ
      </p>

      <button
        onClick={onExploreClick}
        className="relative flex items-center gap-2 bg-[#3b342f] text-white px-6 py-3 rounded-full hover:bg-[#4b433e] transition z-10"
      >
        Gallery
        <ArrowRight size={18} />
      </button>

      <div className="relative mt-10 animate-bounce z-10">
        <ArrowRight size={28} className="rotate-90 text-gray-500" />
      </div>
    </section>
  );
};

export default Hero;
