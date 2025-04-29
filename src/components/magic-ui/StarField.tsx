// components/magic-ui/StarField.tsx
'use client';

import { useEffect, useRef } from 'react';

export function StarField({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create stars
    const stars = 200;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < stars; i++) {
      const star = document.createElement('div');
      star.className = 'absolute w-px h-px bg-white rounded-full';

      // Random position
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;

      // Random animation delay and duration
      star.style.animation = `twinkle ${2 + Math.random() * 3}s infinite ${Math.random() * 5}s`;

      fragment.appendChild(star);
    }

    container.appendChild(fragment);

    return () => {
      if (container) container.innerHTML = '';
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none opacity-40 ${className}`}
      style={{
        background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)'
      }}
    />
  );
}

// Add this to your global CSS
// Add this to your globals.css or CSS-in-JS
/*
@keyframes twinkle {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}
*/
