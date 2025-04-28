'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FilterProps, FormDataProps } from '@/types/formData';

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
        <h2 className='text-xl font-bold text-gray-800'>Próximos Eventos</h2>
        <div className='text-sm text-gray-500'>
          Página {currentPage} de {totalPages}
        </div>
      </div>

      {/* Events List */}
      <div className='space-y-4'>
        {events.length === 0 ? (
          <div className='text-center py-8 text-gray-500'>Nenhum evento encontrado</div>
        ) : (
          events.map((event: FormDataProps) => (
            <div key={event.id} className='bg-white p-6 rounded-lg shadow border border-gray-100'>
              <div className='flex justify-between items-start'>
                <div>
                  <h3 className='font-bold text-lg text-amber-800'>{event.title}</h3>
                  <p className='text-gray-600 mt-1'>
                    {formatDate(event.date)} às {event.hour}
                  </p>
                  {event.address && (
                    <p className='text-gray-700 mt-1'>
                      {event.address.street}, {event.address.number}
                      {event.address.complement && ` - ${event.address.complement}`}
                    </p>
                  )}
                  {event.meeting_link && (
                    <a
                      href={event.meeting_link}
                      target='_blank'
                      className='inline-block mt-2 text-sm text-amber-600 hover:text-amber-800'
                    >
                      Link da reunião
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className='flex justify-between items-center mt-6'>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`flex items-center px-4 py-2 rounded-lg ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-amber-700 hover:bg-amber-50'
            }`}
          >
            <FiChevronLeft className='mr-1' /> Anterior
          </button>

          <div className='flex space-x-1'>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show pages around current page
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-full ${
                    currentPage === pageNum
                      ? 'bg-amber-600 text-white'
                      : 'text-gray-700 hover:bg-amber-50'
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
            className={`flex items-center px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-amber-700 hover:bg-amber-50'
            }`}
          >
            Próxima <FiChevronRight className='ml-1' />
          </button>
        </div>
      )}
    </div>
  );
}
