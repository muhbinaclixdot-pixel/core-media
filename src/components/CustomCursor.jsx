// src/components/CustomCursor.jsx
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [cursorVariant, setCursorVariant] = useState('default');
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 450, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const dotSpringConfig = { damping: 40, stiffness: 1200, mass: 0.04 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  useEffect(() => {
    // Touch detection
    if (typeof window !== 'undefined') {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(isTouch);
      if (isTouch) return;
    }

    const mouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const mouseLeave = () => setIsVisible(false);
    const mouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', mouseMove, { passive: true });
    document.addEventListener('mouseleave', mouseLeave);
    document.addEventListener('mouseenter', mouseEnter);

    // Global listener for interactive elements
    const handleElementHover = () => {
      const interactiveElements = document.querySelectorAll(
        'button, a, input, textarea, select, [data-cursor], .interactive-card, .gallery-item, .video-trigger, .tilt-card'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          const customType = el.getAttribute('data-cursor');
          if (customType === 'view') {
            setCursorVariant('view');
            setCursorText('VIEW');
          } else if (customType === 'play') {
            setCursorVariant('play');
            setCursorText('PLAY');
          } else if (customType === 'drag') {
            setCursorVariant('drag');
            setCursorText('DRAG');
          } else if (customType === 'spec') {
            setCursorVariant('spec');
            setCursorText('SPEC');
          } else if (customType === 'book') {
            setCursorVariant('book');
            setCursorText('BOOK');
          } else if (customType === 'card' || el.classList.contains('interactive-card')) {
            setCursorVariant('card');
            setCursorText('');
          } else {
            setCursorVariant('hover');
            setCursorText('');
          }
        });

        el.addEventListener('mouseleave', () => {
          setCursorVariant('default');
          setCursorText('');
        });
      });
    };

    handleElementHover();

    const observer = new MutationObserver(handleElementHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseleave', mouseLeave);
      document.removeEventListener('mouseenter', mouseEnter);
      observer.disconnect();
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-sky-300 rounded-full pointer-events-none z-[9999] shadow-[0_0_10px_#38bdf8] mix-blend-screen"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Dynamic Trailing Magnetic Halo */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] flex items-center justify-center font-mono-tech font-black uppercase text-center select-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorVariant === 'default' ? 32 : cursorVariant === 'hover' ? 52 : cursorVariant === 'card' ? 64 : 80,
          height: cursorVariant === 'default' ? 32 : cursorVariant === 'hover' ? 52 : cursorVariant === 'card' ? 64 : 80,
          backgroundColor: 
            cursorVariant === 'default' ? 'transparent' :
            cursorVariant === 'hover' ? 'rgba(0, 102, 255, 0.18)' :
            cursorVariant === 'play' ? 'rgba(14, 165, 233, 0.92)' :
            cursorVariant === 'view' ? 'rgba(0, 102, 255, 0.9)' :
            cursorVariant === 'spec' ? 'rgba(6, 18, 59, 0.92)' :
            cursorVariant === 'book' ? 'rgba(255, 255, 255, 0.95)' :
            cursorVariant === 'drag' ? 'rgba(6, 13, 36, 0.88)' : 'rgba(0, 102, 255, 0.12)',
          borderColor: 
            cursorVariant === 'default' ? 'rgba(56, 189, 248, 0.45)' :
            cursorVariant === 'hover' ? '#38bdf8' :
            cursorVariant === 'book' ? '#0066ff' : '#38bdf8',
          borderWidth: cursorVariant === 'default' ? 1.5 : 2,
          color: cursorVariant === 'book' ? '#030a21' : '#ffffff',
          boxShadow: cursorVariant === 'default' 
            ? 'none' 
            : '0 0 30px rgba(0, 102, 255, 0.5)',
          backdropFilter: ['view', 'play', 'spec', 'drag'].includes(cursorVariant) ? 'blur(8px)' : 'none',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="text-[10px] tracking-widest leading-none font-black"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
