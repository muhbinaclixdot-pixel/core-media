// src/components/CoreLogo.jsx
import React from 'react';
import coreLogoImg from '../assets/core-logo.png';

export default function CoreLogo({ className = "", size = "normal", showText = false, showTagline = false }) {
  const isLarge = size === "large";
  const isSmall = size === "small";

  return (
    <div className={`flex items-center gap-3 select-none group ${className}`}>
      {/* Official Core Media Brand Symbol */}
      <div className="relative flex items-center justify-center shrink-0">
        <img
          src={coreLogoImg}
          alt="Core Media Logo"
          className={`object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_20px_rgba(0,102,255,0.6)] ${
            isLarge ? 'h-14 w-auto' : isSmall ? 'h-7 w-auto' : 'h-10 w-auto'
          }`}
        />
      </div>

      {/* Brand Typography (Optional) */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-baseline tracking-tight">
            <span className={`font-display font-black tracking-wider text-white ${
              isLarge ? 'text-3xl' : isSmall ? 'text-base' : 'text-xl'
            }`}>
              CORE
            </span>
            <span className={`font-display font-black ml-1.5 text-sky-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.7)] ${
              isLarge ? 'text-3xl' : isSmall ? 'text-base' : 'text-xl'
            }`}>
              MEDIA
            </span>
          </div>

          {showTagline && (
            <div className="flex items-center gap-1.5 mt-[-1px]">
              <span className={`font-mono-tech uppercase font-bold text-white/85 tracking-[0.22em] ${
                isLarge ? 'text-xs' : 'text-[9px]'
              }`}>
                AUDIO <span className="text-sky-400">•</span> VISUAL <span className="text-sky-400">•</span> LIGHTING
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
