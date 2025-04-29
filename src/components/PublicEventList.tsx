'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FilterProps, FormDataProps } from '@/types/formData';
import { motion } from 'framer-motion';

export default function PublicEventList({ filters }: { filters: FilterProps }) {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(5); // Items per page
  const [totalPages, setTotalPages] = useState(1);

  // Fetch events when filters or page changes
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let url = `/api/events?page=${currentPage}&limit=${eventsPerPage}`;

        if (filters.date) url += `&date=${filters.date}`;
        if (filters.location) url += `&location=${filters.location}`;
        if (filters.type !== 'all') url += `&type=${filters.type}`;

        const res = await fetch(url);
        const { events, total } = await res.json();

        setEvents(events);
        setTotalPages(Math.ceil(total / eventsPerPage));
      } catch (error) {
        toast.error('Erro ao carregar eventos');
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [currentPage, eventsPerPage, filters]);

  // Format date to Brazilian format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent'>
          Próximos Eventos
        </h2>
        <div className='text-sm text-blue-300/80'>
          Página {currentPage} de {totalPages}
        </div>
      </div>

      {/* Events List */}
      <div className='space-y-4'>
        {events.length === 0 ? (
          <div className='text-center py-8 text-blue-300/60'>Nenhum evento encontrado</div>
        ) : (
          events.map((event: FormDataProps) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className='p-6 rounded-xl backdrop-blur-lg bg-slate-800/30 border border-slate-700/50 hover:border-cyan-400/30 transition-all'
            >
              <div className='flex justify-between items-start'>
                <div>
                  <h3 className='font-bold text-lg text-cyan-300 mb-2'>{event.title}</h3>
                  <div className='flex items-center text-blue-200/80 space-x-4'>
                    <span className='flex items-center'>
                      <svg
                        className='w-4 h-4 mr-2 text-cyan-400'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                        />
                      </svg>
                      {formatDate(event.date)} às {event.hour}
                    </span>
                    {event.address && (
                      <span className='flex items-center'>
                        <svg
                          className='w-4 h-4 mr-2 text-cyan-400'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                          />
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                          />
                        </svg>
                        {event.address.street}, {event.address.number}
                        {event.address.complement && ` - ${event.address.complement}`}
                      </span>
                    )}
                  </div>
                  {event.meeting_link && (
                    <a
                      href={event.meeting_link}
                      target='_blank'
                      className='inline-block mt-3 px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-colors'
                    >
                      <span className='flex items-center'>
                        <svg
                          className='w-4 h-4 mr-2'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
                          />
                        </svg>
                        Link da reunião
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className='flex justify-between items-center mt-8'>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`flex items-center px-4 py-2 rounded-xl ${
              currentPage === 1
                ? 'text-slate-600 cursor-not-allowed'
                : 'text-cyan-300 hover:bg-slate-700/40'
            }`}
          >
            <FiChevronLeft className='mr-1' /> Anterior
          </button>

          <div className='flex space-x-2'>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    currentPage === pageNum
                      ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white'
                      : 'text-cyan-300 hover:bg-slate-700/40'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`flex items-center px-4 py-2 rounded-xl ${
              currentPage === totalPages
                ? 'text-slate-600 cursor-not-allowed'
                : 'text-cyan-300 hover:bg-slate-700/40'
            }`}
          >
            Próxima <FiChevronRight className='ml-1' />
          </button>
        </div>
      )}
    </div>
  );
}
