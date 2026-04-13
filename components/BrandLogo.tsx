
import React from 'react';

interface BrandLogoProps {
  className?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ className = "w-12 h-12" }) => {
  return (
    <div className={className}>
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Golden Outer Circle */}
        <circle cx="100" cy="100" r="90" stroke="#b8a262" strokeWidth="4" fill="none" />
        
        {/* Meditative Figure (Simplified) */}
        <path 
          d="M100 70C110 70 118 62 118 52C118 42 110 34 100 34C90 34 82 42 82 52C82 62 90 70 100 70Z" 
          fill="#267078" 
        />
        {/* Halo */}
        <circle cx="100" cy="52" r="22" stroke="#b8a262" strokeWidth="3" fill="none" />
        
        {/* Body and Lotus Pose */}
        <path 
          d="M100 75C85 75 75 85 75 100V130L40 160C30 170 50 185 70 180C90 175 110 175 130 180C150 185 170 170 160 160L125 130V100C125 85 115 75 100 75Z" 
          fill="url(#grad1)" 
        />
        
        {/* Calculator on Chest */}
        <rect x="75" y="95" width="50" height="70" rx="4" fill="#267078" />
        <rect x="80" y="100" width="40" height="15" rx="2" fill="white" />
        <text x="110" y="111" fontSize="10" fill="#267078" fontWeight="bold">∞</text>
        
        {/* Calculator Buttons */}
        <rect x="80" y="120" width="8" height="8" rx="1" fill="#7ab357" />
        <rect x="91" y="120" width="8" height="8" rx="1" fill="#7ab357" />
        <rect x="102" y="120" width="8" height="8" rx="1" fill="#7ab357" />
        <rect x="113" y="120" width="8" height="8" rx="1" fill="#b8a262" />
        
        <rect x="80" y="131" width="8" height="8" rx="1" fill="#7ab357" />
        <rect x="91" y="131" width="8" height="8" rx="1" fill="#7ab357" />
        <rect x="102" y="131" width="8" height="8" rx="1" fill="#7ab357" />
        <rect x="113" y="131" width="8" height="19" rx="1" fill="#7ab357" />
        
        <rect x="80" y="142" width="8" height="8" rx="1" fill="#7ab357" />
        <rect x="91" y="142" width="8" height="8" rx="1" fill="#7ab357" />
        <rect x="102" y="142" width="8" height="8" rx="1" fill="#7ab357" />
        
        <rect x="80" y="153" width="19" height="8" rx="1" fill="#7ab357" />
        <rect x="102" y="153" width="8" height="8" rx="1" fill="#7ab357" />
        
        {/* Hand Mudras */}
        <circle cx="45" cy="155" r="4" fill="#267078" />
        <circle cx="155" cy="155" r="4" fill="#267078" />
        
        <defs>
          <linearGradient id="grad1" x1="100" y1="75" x2="100" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#267078" />
            <stop offset="50%" stopColor="#7ab357" />
            <stop offset="100%" stopColor="#267078" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default BrandLogo;
