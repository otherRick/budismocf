import { FormDataProps } from '@/types/formData';
import { motion } from 'framer-motion';
import { FiCalendar, FiSend } from 'react-icons/fi';
import EventCard from './WebEventCard';

export default function LeftContent({ events }: { events: { events: FormDataProps[] } }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className='bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 shadow-xl overflow-auto scroll-hidden '
    >
      <div className='relative'>
        <h2 className='text-xl font-bold text-white mb-6 flex items-center'>
          <FiCalendar className='mr-3 text-amber-400' />
          <span className='bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent'>
            Próximos Eventos
          </span>
        </h2>
        <div className='absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-xl'></div>
      </div>

      <div className='space-y-4 relative z-10'>
        {events?.events?.map((event: FormDataProps) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <motion.div
        className='mt-8 relative'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className='absolute -left-6 top-1/2 w-12 h-12 bg-blue-500/10 rounded-full blur-xl'></div>
        <h3 className='text-sm text-blue-300 mb-3'>Receba lembretes</h3>
        <div className='flex rounded-lg overflow-hidden'>
          <input
            type='email'
            placeholder='Seu email'
            className='flex-1 px-4 py-3 bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-400/30'
          />
          <button className='bg-amber-500 hover:bg-amber-600 text-white px-4 flex items-center justify-center transition-colors'>
            <FiSend />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
