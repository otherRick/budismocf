import { motion } from 'framer-motion';
import { FiCalendar } from 'react-icons/fi';
import EventCard from '../WebEventCard';
import { FormDataProps } from '@/types/formData';

export default function EventTab({
  events,
  onEvents
}: {
  events?: FormDataProps[];
  onEvents?: () => void;
}) {
  return (
    <motion.div
      key='events'
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      onClick={onEvents}
      className='h-full bg-gray-800/30 rounded-xl p-4 backdrop-blur-sm border border-gray-700/50 overflow-y-auto scroll-hidden '
    >
      <h2 className='text-lg font-bold text-white mb-4 flex items-center'>
        <FiCalendar className='mr-2 text-amber-400' />
        Próximos Eventos
      </h2>

      <div className='space-y-3'>
        {events?.map((event: FormDataProps) => {
          return <EventCard key={event.id} event={event} />;
        })}
      </div>
    </motion.div>
  );
}
