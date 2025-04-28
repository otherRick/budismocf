import { MounseEventProps } from '@/types/formData';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

export default function CenterContent({ onMouseEnter, onMouseLeave }: MounseEventProps) {
  return (
    <div className='flex flex-col items-center justify-center relative'>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className='text-center'
      >
        {/* Animated orb */}

        <div className='relative mb-12'>
          <div className='relative w-64 h-64'>
            {/* Glow effect */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.6, 0.8, 0.6]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className='absolute inset-0 rounded-full bg-amber-400/20 blur-xl'
            />

            {/* Orb layers */}
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'linear'
              }}
              className='absolute inset-0 rounded-full border-2 border-amber-400/10'
            />

            <motion.div
              animate={{
                rotate: -360,
                scale: [0.9, 0.95, 0.9]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear'
              }}
              className='absolute inset-4 rounded-full border border-amber-400/15'
            />

            {/* Main orb */}
            <div className='absolute inset-8 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl overflow-hidden'>
              <motion.div
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%']
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                className='absolute inset-0 bg-gradient-to-br from-amber-400/5 via-transparent to-blue-400/5 bg-[length:200%_200%]'
              />
              <motion.span
                className='text-6xl z-10'
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                🧘
              </motion.span>
            </div>
          </div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className='text-4xl font-bold text-white mb-4'
        >
          <span className='bg-gradient-to-r from-amber-400 to-blue-400 bg-clip-text text-transparent'>
            Encontre Paz Interior
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className='relative overflow-hidden group px-8 py-4 rounded-full text-lg font-medium'
          >
            <div className='absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 opacity-100 group-hover:opacity-90 transition-opacity duration-300 rounded-full'></div>
            <div className='absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full'></div>
            <div className='relative z-10 flex items-center justify-center space-x-2 text-white'>
              <span>Comece Agora</span>
              <FiArrowRight className='group-hover:translate-x-1 transition-transform' />
            </div>
            <div className='absolute inset-0 rounded-full border border-amber-400/30 group-hover:border-amber-400/50 transition-all duration-300 pointer-events-none'></div>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
