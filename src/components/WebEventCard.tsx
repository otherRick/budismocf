// src/components/EventCard.tsx
import { AddressProps, FormDataProps } from '@/types/formData';
import { FaVideo } from 'react-icons/fa';
import { FiClock, FiMapPin, FiArrowRight } from 'react-icons/fi';

export default function EventCard({ event }: { event: FormDataProps }) {
  function formatAddress(address?: AddressProps | null): string | null {
    if (!address) return null;

    const {
      street = '',
      number = '',
      complement = '',
      neighborhood = '',
      city = '',
      state = ''
    } = address;

    // Construir o endereço completo
    let fullAddress = `${street}, ${number}`;
    if (complement) fullAddress += `, ${complement}`;
    if (neighborhood) fullAddress += `, ${neighborhood}`;
    fullAddress += `, ${city} - ${state}`;

    // Codificar o endereço para uso em URL
    return encodeURIComponent(fullAddress);
  }
  const query = formatAddress(event.address);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

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
        {event.hour}
      </div>
      <div className='flex items-center text-sm text-blue-300 mt-1'>
        <FaVideo className='mr-2' />{' '}
        <a target='_blank' href={event.meeting_link}>
          Zoom (via link)
        </a>
      </div>
      <div className='flex items-center text-sm text-blue-300 mt-1'>
        <FiMapPin className='mr-2' />
        <a target='_blank' href={mapsUrl}>
          {event.address?.neighborhood} {event.address?.number && `Nº ${event.address?.number}`},{' '}
          {event.address?.city} - {event.address?.state}
        </a>
      </div>
      <a
        href={event.meeting_link}
        className='mt-3 w-full flex items-center justify-center space-x-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 py-2 rounded-lg text-sm transition-all border border-amber-500/20 hover:border-amber-500/40'
      >
        <span>Reservar</span>
        <FiArrowRight size={14} />
      </a>
    </div>
  );
}
