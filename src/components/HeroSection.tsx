import { motion } from 'framer-motion';

export default function HeroSection() {
  // Simple animation for the floating elements
  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <section className='relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100'>
      {/* Animated background elements */}
      <motion.div
        className='absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-amber-200/30 blur-xl'
        variants={floatingVariants}
        animate='animate'
      />
      <motion.div
        className='absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-amber-300/20 blur-xl'
        variants={floatingVariants}
        animate='animate'
        style={{ animationDelay: '2s' }}
      />
      <motion.div
        className='absolute top-1/3 right-1/3 w-20 h-20 rounded-full bg-amber-400/15 blur-xl'
        variants={floatingVariants}
        animate='animate'
        style={{ animationDelay: '4s' }}
      />

      <div className='relative z-10 text-center px-4 max-w-4xl mx-auto'>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-4xl md:text-6xl font-serif font-bold text-gray-800 mb-6'
        >
          Find Peace in the Present Moment
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto'
        >
          Discover ancient Buddhist wisdom adapted for modern life through guided meditations and
          mindful practices.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='flex flex-col sm:flex-row justify-center gap-4'
        >
          <button className='bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-md text-lg font-medium transition-colors duration-200 shadow-md'>
            Start Meditating
          </button>
          <button className='border border-amber-500 text-amber-600 hover:bg-amber-50 px-8 py-3 rounded-md text-lg font-medium transition-colors duration-200'>
            Learn More
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator (even though no scrolling, it can indicate content below) */}
      <motion.div
        className='absolute bottom-10 left-1/2 transform -translate-x-1/2'
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg
          className='w-6 h-6 text-amber-500'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 14l-7 7m0 0l-7-7m7 7V3'
          />
        </svg>
      </motion.div>
    </section>
  );
}
