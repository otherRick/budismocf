'use client';

import { FiFilter, FiX, FiCalendar, FiMapPin } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { EventFiltersProps, FilterProps } from '@/types/formData';

export default function EventFilters({
  onFilterChange,
  initialDate = '',
  initialLocation = ''
}: EventFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterProps>({
    date: initialDate,
    location: initialLocation,
    type: 'all' // 'all', 'online', 'in-person'
  });

  useEffect(() => {
    onFilterChange(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      date: '',
      location: '',
      type: 'all'
    });
  };

  return (
    <div className='mb-6'>
      {/* Filter Trigger Button */}
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-serif font-bold text-amber-800'>Eventos</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center px-4 py-2 rounded-full ${
            isOpen ? 'bg-amber-100 text-amber-800' : 'bg-white text-amber-600'
          } shadow-sm border border-amber-200`}
        >
          <FiFilter className='mr-2' />
          {isOpen ? 'Ocultar Filtros' : 'Filtrar Eventos'}
        </button>
      </div>

      {/* Filter Panel */}
      {isOpen && (
        <div className='mt-4 p-6 bg-white rounded-xl shadow-md border border-amber-100 animate-fadeIn'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/* Date Filter */}
            <div className='space-y-2'>
              <label className='flex items-center text-sm font-medium text-amber-700'>
                <FiCalendar className='mr-2' />
                Data do Evento
              </label>
              <input
                type='date'
                name='date'
                value={filters.date}
                onChange={handleInputChange}
                className='w-full p-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500'
              />
            </div>

            {/* Location Filter */}
            <div className='space-y-2'>
              <label className='flex items-center text-sm font-medium text-amber-700'>
                <FiMapPin className='mr-2' />
                Localização
              </label>
              <select
                name='location'
                value={filters.location}
                onChange={handleInputChange}
                className='w-full p-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500'
              >
                <option value=''>Todos os locais</option>
                <option value='Cabo Frio'>Cabo Frio</option>
                <option value='Online'>Online</option>
                <option value='Praia do Forte'>Praia do Forte</option>
                <option value='Centro Cultural'>Centro Cultural</option>
              </select>
            </div>

            {/* Event Type Filter */}
            <div className='space-y-2'>
              <label className='text-sm font-medium text-amber-700'>Tipo de Evento</label>
              <div className='flex space-x-4 pt-2'>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    name='type'
                    value='all'
                    checked={filters.type === 'all'}
                    onChange={handleInputChange}
                    className='text-amber-600 focus:ring-amber-500'
                  />
                  <span className='ml-2'>Todos</span>
                </label>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    name='type'
                    value='online'
                    checked={filters.type === 'online'}
                    onChange={handleInputChange}
                    className='text-amber-600 focus:ring-amber-500'
                  />
                  <span className='ml-2'>Online</span>
                </label>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    name='type'
                    value='in-person'
                    checked={filters.type === 'in-person'}
                    onChange={handleInputChange}
                    className='text-amber-600 focus:ring-amber-500'
                  />
                  <span className='ml-2'>Presencial</span>
                </label>
              </div>
            </div>
          </div>

          {/* Filter Actions */}
          <div className='mt-6 flex justify-end space-x-3'>
            <button
              onClick={clearFilters}
              className='px-4 py-2 text-amber-600 hover:text-amber-800 flex items-center'
            >
              <FiX className='mr-1' /> Limpar Filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
