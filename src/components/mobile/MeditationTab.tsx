import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

export default function MeditationTab() {
  return (
    <motion.div
      key='meditation'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className='h-full flex flex-col items-center justify-center'
    >
      {/* Simplified orb for mobile */}
      <div className='relative mb-8 w-48 h-48'>
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className='absolute inset-0 rounded-full bg-amber-400/20 blur-xl'
        />

        <div className='absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg'>
          <motion.span
            className='text-5xl'
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

      <h2 className='text-2xl font-bold text-white text-center mb-3'>
        <span className='bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent'>
          Encontre Paz
        </span>
      </h2>

      <motion.button
        whileTap={{ scale: 0.95 }}
        className='px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full text-sm font-medium shadow-md flex items-center space-x-2'
      >
        <span>Comece Agora</span>
        <FiArrowRight size={16} />
      </motion.button>
    </motion.div>
  );
}
