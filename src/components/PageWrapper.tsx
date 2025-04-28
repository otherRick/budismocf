import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const backgroundX = useTransform(cursorX, [0, window.innerWidth], [-20, 20]);
  const backgroundY = useTransform(cursorY, [0, window.innerHeight], [-20, 20]);

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
      <div className='fixed inset-0 overflow-hidden bg-gray-900'>
        <motion.div
          className='absolute inset-0 opacity-90'
          style={{
            background:
              'radial-gradient(circle at center, rgba(125, 211, 252, 0.15) 0%, rgba(217, 119, 6, 0.1) 50%, rgba(15, 23, 42, 1) 100%)',
            x: backgroundX,
            y: backgroundY
          }}
        />
        {children}
      </div>
    </>
  );
}
