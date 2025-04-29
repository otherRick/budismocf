'use client';

import EventFilters from '@/components/EventFilters';
import HeaderWeb from '@/components/HeaderWeb';
import MobileFooter from '@/components/mobile/MobileFooter';
import PageWrapper from '@/components/PageWrapper';
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
    <PageWrapper>
      <div className='relative w-full flex flex-col p-6 md:p-8 lg:p-12 mt-32 md:mt-0'>
        <HeaderWeb />
        <h1 className='text-2xl font-serif font-bold text-center'>Eventos de Meditação</h1>
        <div className='container mx-auto px-4 py-8 pb-80 overflow-y-auto scroll-hidden max-h-[600px]'>
          <EventFilters
            onFilterChange={setFilter}
            initialDate={filters.date}
            initialLocation={filters.location}
          />
          <PublicEventList filters={filters} />
        </div>
        <div className='p-4 border-b border-amber-200'></div>
        <MobileFooter />
      </div>
    </PageWrapper>
  );
}
