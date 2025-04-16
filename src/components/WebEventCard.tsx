// src/components/EventCard.tsx
import { FiClock, FiMapPin, FiArrowRight } from 'react-icons/fi';

export type Event = {
  title: string;
  time: string;
  location: string;
  link: string;
  date: string;
  description: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export default function EventCard({ event }: { event: Event }) {
  return (
    <div className='p-4 bg-gray-700/30 rounded-xl border border-gray-600/30 backdrop-blur-sm hover:border-amber-400/30 transition-all'>
      <h3 className='font-medium text-white'>{event.title}</h3>
      <div className='flex items-center text-sm text-blue-300 mt-2'>
        <FiClock className='mr-2' />{' '}
        {new Date(event.date)
          .toLocaleString('pt-BR', { weekday: 'long' })
          .split('-')[0]
          .charAt(0)
          .toUpperCase() +
          new Date(event.date)
            .toLocaleString('pt-BR', { weekday: 'long' })
            .split('-')[0]
            .slice(1) +
          ', '}
        {event.time}
      </div>
      <div className='flex items-center text-sm text-blue-300 mt-1'>
        <FiMapPin className='mr-2' />{' '}
        {event.location.includes('https://') ? (
          <a target='_blank' href={event.location}>
            Zoom (via link)
          </a>
        ) : (
          event.location
        )}
      </div>
      <a
        href={event.link}
        className='mt-3 w-full flex items-center justify-center space-x-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 py-2 rounded-lg text-sm transition-all border border-amber-500/20 hover:border-amber-500/40'
      >
        <span>Reservar</span>
        <FiArrowRight size={14} />
      </a>
    </div>
  );
}
