import { MounseEventProps } from '@/types/formData';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function HeaderWeb({ onMouseEnter, onMouseLeave }: MounseEventProps) {
  const route = useRouter();
  return (
    <header className='flex justify-between items-center mb-8 w-full'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h1 className='text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600'>
          ZenRio
        </h1>
        <p className='text-sm text-blue-300/80'>Cabo Frio · RJ</p>
      </motion.div>

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className='hidden md:flex space-x-8'
      >
        {['Eventos', 'Meditar', 'Sabedorias', 'BudaBlog'].map((item) => {
          return (
            <button
              key={item}
              onClick={() => route.push(`/${item.toLowerCase()}`)}
              className='relative text-blue-100/80 hover:text-white transition-colors group'
            >
              {item}
              <span className='absolute bottom-0 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300'></span>
            </button>
          );
        })}
      </motion.nav>
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className='relative overflow-hidden group'
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className='absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg'></div>
        <div className='relative px-6 py-2.5 text-sm font-medium text-white bg-transparent border border-amber-500/50 rounded-lg backdrop-blur-sm group-hover:border-transparent transition-all duration-300'>
          <a href='https://dojoroom-app.web.app/'>Participe</a>
        </div>
      </motion.button>
    </header>
  );
}
