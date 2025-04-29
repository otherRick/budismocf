'use client';

import { FiFilter, FiX, FiCalendar, FiMapPin } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { EventFiltersProps, FilterProps } from '@/types/formData';
import { AnimatePresence, motion } from 'framer-motion';
import ZenCalendar from './ZenCalendar';

export default function EventFilters({
  onFilterChange,
  initialDate = '',
  initialLocation = ''
}: EventFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterProps>({
    date: initialDate,
    location: initialLocation,
    type: 'all'
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
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    setFilters((prev) => ({ ...prev, date: selectedDate }));
  };

  return (
    <div className='mb-8'>
      {/* Filter Trigger Button */}
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent'>
          Eventos
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center px-6 py-3 rounded-xl ${
            isOpen
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
              : 'bg-slate-800/30 text-cyan-300 hover:bg-slate-700/40 border border-slate-700/50'
          } backdrop-blur-sm transition-all`}
        >
          <FiFilter className='mr-2' />
          {isOpen ? 'Ocultar Filtros' : 'Filtrar Eventos'}
        </motion.button>
      </div>

      {/* Filter Panel */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className='mt-4 p-6 backdrop-blur-xl bg-slate-800/30 rounded-xl border border-slate-700/50 shadow-2xl'
          >
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {/* Date Filter - Mobile Version */}
              <div className='md:hidden space-y-2'>
                <label className='flex items-center text-sm font-medium text-cyan-300'>
                  <FiCalendar className='mr-2 text-cyan-400' />
                  Data do Evento
                </label>
                <input
                  type='date'
                  name='date'
                  value={filters.date}
                  onChange={handleDateChange}
                  className='w-full p-3 bg-slate-800/40 border border-slate-700/50 rounded-lg text-cyan-200 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/30 outline-none'
                />
              </div>

              {/* Date Filter - Desktop Version */}
              <div className='hidden md:block col-span-1'>
                <label className='flex items-center text-sm font-medium text-cyan-300 mb-2'>
                  <FiCalendar className='mr-2 text-cyan-400' />
                  Data do Evento
                </label>
                <div className='relative'>
                  <ZenCalendar
                    value={filters.date}
                    onChange={(date) => setFilters((prev) => ({ ...prev, date }))}
                    onClose={() => setIsOpen(false)}
                  />
                </div>
              </div>

              {/* Location Filter */}
              <div className='space-y-2'>
                <label className='flex items-center text-sm font-medium text-cyan-300'>
                  <FiMapPin className='mr-2 text-cyan-400' />
                  Localização
                </label>
                <select
                  name='location'
                  value={filters.location}
                  onChange={handleInputChange}
                  className='w-full p-3 bg-slate-800/40 border border-slate-700/50 rounded-lg text-cyan-200 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/30 outline-none'
                >
                  <option value='' className='bg-slate-800'>
                    Todos os locais
                  </option>
                  <option value='Cabo Frio' className='bg-slate-800'>
                    Cabo Frio
                  </option>
                  <option value='Online' className='bg-slate-800'>
                    Online
                  </option>
                  <option value='Praia do Forte' className='bg-slate-800'>
                    Praia do Forte
                  </option>
                  <option value='Centro Cultural' className='bg-slate-800'>
                    Centro Cultural
                  </option>
                </select>
              </div>

              {/* Event Type Filter */}
              <div className='space-y-2'>
                <label className='text-sm font-medium text-cyan-300'>Tipo de Evento</label>
                <div className='flex flex-col space-y-3 pt-2'>
                  <label className='inline-flex items-center'>
                    <input
                      type='radio'
                      name='type'
                      value='all'
                      checked={filters.type === 'all'}
                      onChange={handleInputChange}
                      className='form-radio text-cyan-400 focus:ring-cyan-500/50 border-slate-600 bg-slate-700/50'
                    />
                    <span className='ml-3 text-cyan-200'>Todos</span>
                  </label>
                  <label className='inline-flex items-center'>
                    <input
                      type='radio'
                      name='type'
                      value='online'
                      checked={filters.type === 'online'}
                      onChange={handleInputChange}
                      className='form-radio text-cyan-400 focus:ring-cyan-500/50 border-slate-600 bg-slate-700/50'
                    />
                    <span className='ml-3 text-cyan-200'>Online</span>
                  </label>
                  <label className='inline-flex items-center'>
                    <input
                      type='radio'
                      name='type'
                      value='in-person'
                      checked={filters.type === 'in-person'}
                      onChange={handleInputChange}
                      className='form-radio text-cyan-400 focus:ring-cyan-500/50 border-slate-600 bg-slate-700/50'
                    />
                    <span className='ml-3 text-cyan-200'>Presencial</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Filter Actions */}
            <div className='mt-6 flex justify-end'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={clearFilters}
                className='px-4 py-2 text-cyan-300 hover:text-cyan-400 flex items-center transition-colors'
              >
                <FiX className='mr-2' /> Limpar Filtros
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
