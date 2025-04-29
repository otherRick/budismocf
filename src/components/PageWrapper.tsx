import { motion, useMotionValue } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window?.addEventListener('mousemove', moveCursor);
    return () => window?.removeEventListener('mousemove', moveCursor);
  }, []);

  useEffect(() => {
    cursorX.set(cursorPosition.x);
    cursorY.set(cursorPosition.y);
  }, [cursorPosition, cursorX, cursorY]);

  return (
    <>
      <div className='fixed inset-0 overflow-hidden scroll-hidden h-screen  bg-gray-900'>
        <motion.div
          className='absolute inset-0 opacity-90'
          style={{
            background:
              'radial-gradient(circle at center, rgba(125, 211, 252, 0.15) 0%, rgba(217, 119, 6, 0.1) 50%, rgba(15, 23, 42, 1) 100%)'
          }}
        />
        {children}
      </div>
    </>
  );
}
