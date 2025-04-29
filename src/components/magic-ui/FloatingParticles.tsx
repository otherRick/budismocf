import { motion } from 'framer-motion';

export default function FloatingParticles() {
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className='absolute rounded-full bg-amber-400/20 sm:bg-amber-400/30'
          style={{
            width: Math.random() * 8 + 4,
            height: Math.random() * 8 + 4,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, (Math.random() - 0.5) * 40],
            x: [0, (Math.random() - 0.5) * 40],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: Math.random() * 8 + 8,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        />
      ))}
    </>
  );
}
