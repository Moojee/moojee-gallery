import React, { useState, useEffect } from "react";
import bell from "../assets/art/S__31588365_0.jpg";
import green from "../assets/art/S__39247888_0.jpg";


const Hero = ({ onExploreClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [strokes, setStrokes] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // ตรวจสอบว่าเป็นมือถือหรือไม่
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ลบ stroke เก่าออกเรื่อยๆ
  useEffect(() => {
    if (strokes.length > 30) {
      setStrokes((prev) => prev.slice(prev.length - 30));
    }
  }, [strokes]);

  const handleMouseMove = (e) => {
    // ปิด brush effect บนมือถือเพื่อ performance
    if (isMobile) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

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
      className={`relative flex flex-col lg:flex-row items-center justify-between min-h-screen text-left transition-opacity duration-1000 px-4 sm:px-6 md:px-12 lg:px-16 py-12 lg:py-0 bg-[#f6f4f2] overflow-hidden ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Background Pattern - ลดความเข้มลง */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "url('/images/brush-bg.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />

      {/* แปรงสีตามเมาส์ - แสดงเฉพาะ desktop */}
      {!isMobile && (
        <div className="pointer-events-none absolute inset-0 z-0">
          {strokes.map((stroke) => (
            <span
              key={stroke.id}
              style={{
                left: stroke.x - 60,
                top: stroke.y - 60,
              }}
              className="absolute w-32 h-24 rounded-[999px] bg-[radial-gradient(circle_at_center,_rgba(223,194,160,0.5),_rgba(247,242,237,0))] rotate-[8deg] blur-lg animate-[fadeOut_1.5s_ease-out_forwards]"
            />
          ))}
        </div>
      )}

      {/* Container หลัก */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        
        {/* ส่วนเนื้อหาหลัก */}
        <div className="flex-1 flex flex-col justify-center space-y-4 sm:space-y-6 w-full lg:w-auto text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#2f2a26] leading-tight">
            MOOJEE 
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#2f2a26] leading-tight">
            ART GALLERY
          </h1>
       
         
          <p className="text-[#6e6258] text-sm sm:text-base md:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
            A place to collect the moments I painted for fun, and to practice web
            design along the way.
          </p>
          
          <div className="flex justify-center lg:justify-start">
            <button
              onClick={onExploreClick}
              className="mt-4 bg-[#2f2a26] text-white px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base hover:bg-[#443b35] transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              Art Gallery →
            </button>
          </div>
        </div>

        {/* รูปหลักฝั่งขวา */}
        <div className="flex-1 w-full lg:w-auto flex justify-center lg:justify-end">
          <div className="w-full sm:w-[85%] md:w-[75%] lg:w-[80%] max-w-lgoverflow-hidden  hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
            <img
              src={green}
              alt="Moojee gallery hero artwork"
              className="w-full h-auto object-cover"
              loading="eager"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeOut {
          0% {
            opacity: 0.6;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.4;
          }
          100% {
            opacity: 0;
            transform: scale(1.2);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;