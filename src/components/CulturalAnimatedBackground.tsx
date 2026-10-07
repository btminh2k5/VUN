import React from 'react';

/**
 * A lightweight ambient canvas inspired by Galileo's yellow presentation frame.
 * It stays decorative so the styling workflow remains fast on mobile devices.
 */
export const CulturalAnimatedBackground: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#ffc91f]" aria-hidden="true">
    <div className="absolute inset-0 bg-[linear-gradient(135deg,#ffe495_0%,#ffc91f_42%,#ffb800_100%)]" />
    <div className="ambient-sheet ambient-sheet-one" />
    <div className="ambient-sheet ambient-sheet-two" />
    <div className="ambient-disc ambient-disc-one" />
    <div className="ambient-disc ambient-disc-two" />
    <svg className="ambient-drum" viewBox="0 0 240 240">
      <circle cx="120" cy="120" r="112" />
      <circle cx="120" cy="120" r="86" />
      <circle cx="120" cy="120" r="56" />
      {Array.from({ length: 12 }).map((_, index) => (
        <path key={index} d="M120 64 L114 116 L126 116 Z" transform={`rotate(${index * 30} 120 120)`} />
      ))}
    </svg>
  </div>
);
