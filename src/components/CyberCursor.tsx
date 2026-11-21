'use client';

import React, { useEffect, useState } from 'react';

export default function CyberCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);

      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('button, a, input, select, textarea, [data-cursor]');
      if (interactiveEl) {
        setHovered(true);
        const customText = interactiveEl.getAttribute('data-cursor');
        setCursorText(customText || '');
      } else {
        setHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Trailing lerp animation loop
    let animId: number;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const followLoop = () => {
      setTrailingPos((prev) => ({
        x: lerp(prev.x, pos.x, 0.18),
        y: lerp(prev.y, pos.y, 0.18),
      }));
      animId = requestAnimationFrame(followLoop);
    };

    animId = requestAnimationFrame(followLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [pos]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Outer Smooth Trailing Ring */}
      <div
        className={`fixed top-0 left-0 rounded-full border transition-[width,height,border-color,background-color] duration-200 ease-out flex items-center justify-center ${
          hovered
            ? 'w-12 h-12 -ml-6 -mt-6 border-amber-400 bg-amber-400/10 backdrop-blur-[1px] shadow-[0_0_20px_rgba(212,175,55,0.4)]'
            : 'w-7 h-7 -ml-3.5 -mt-3.5 border-cyan-400/50 bg-cyan-500/5 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`,
        }}
      >
        {cursorText && (
          <span className="text-[9px] font-mono tracking-widest text-amber-300 font-bold uppercase select-none">
            {cursorText}
          </span>
        )}
      </div>

      {/* Center Sharp Dot */}
      <div
        className="fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-amber-300 shadow-[0_0_8px_#f59e0b]"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        }}
      />
    </div>
  );
}
