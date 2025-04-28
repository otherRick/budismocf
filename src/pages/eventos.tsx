'use client';

import EventFilters from '@/components/EventFilters';
import HeaderWeb from '@/components/HeaderWeb';
import PublicEventList from '@/components/PublicEventList';
import { FilterProps } from '@/types/formData';
import { useState } from 'react';

export default function EventsPage() {
  const [filters, setFilter] = useState<FilterProps>({
    date: '',
    location: '',
    type: 'all'
  });

  return (
    <div className='h-screen flex flex-col bg-gradient-to-b from-amber-50 to-amber-100'>
      <header className='bg-amber-600 text-white p-4 shadow-md'>
        <HeaderWeb />
        <h1 className='text-2xl font-serif font-bold text-center'>Eventos de Meditação</h1>
      </header>
      <div className='container mx-auto px-4 py-8'>
        <EventFilters
          onFilterChange={setFilter}
          initialDate={filters.date}
          initialLocation={filters.location}
        />
        <PublicEventList filters={filters} />
      </div>
      <div className='p-4 border-b border-amber-200'></div>
    </div>
  );
}
