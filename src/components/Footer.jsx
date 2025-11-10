import React from "react";

/**
 * Footer Component - ส่วนท้ายเว็บไซต์
 */
const Footer = () => {
  return (
    <div className="max-w-4xl mx-auto px-6">
      <p className="text-sm text-gray-500 leading-relaxed mb-4">
        © {new Date().getFullYear()} Sutita. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
