import { useState } from "react";

export default function Logo() {
  // Toggle animation on hover
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="py-4">
      <a 
        href="#" 
        className="flex items-center" 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => {
          e.preventDefault();
          console.log("Logo clicked - would navigate to homepage");
        }}
      >
        <div className={`relative flex items-center transition-all duration-300 ${isHovered ? "scale-105" : ""}`}>
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-30"></div>
          
          {/* Logo icon with enclosing shape */}
          <div className="relative flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 h-10 w-10 rounded-lg shadow-lg">
            {/* Custom vehicle icon */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              className="h-6 w-6 text-white"
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M5 17h-2v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6" />
              <circle cx="6.5" cy="17.5" r="2.5" />
              <circle cx="16.5" cy="17.5" r="2.5" />
            </svg>
          </div>
          
          <div className="ml-3 flex flex-col">
            <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              PMS
            </span>
            <span className="text-xs text-gray-600 font-medium -mt-1">
              Parking Management System
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}