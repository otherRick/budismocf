'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiCheck, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FilterProps, FormDataProps } from '@/types/formData';

export default function EventList({ filters }: { filters?: FilterProps }) {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(5); // Items per page
  const [totalPages, setTotalPages] = useState(1);
  const [editingId, setEditingId] = useState<number>(0);
  const [editForm, setEditForm] = useState({
    title: '',
    date: '',
    hour: '',
    meeting_link: '',
    description: '',
    address: {
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: ''
    }
  });

  // Fetch events when filters or page changes
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let url = `/api/events?page=${currentPage}&limit=${eventsPerPage}`;

        if (filters?.date) url += `&date=${filters.date}`;
        if (filters?.location) url += `&location=${filters.location}`;
        if (filters?.type !== 'all') url += `&type=${filters?.type}`;

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

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir este evento?')) {
      try {
        const res = await fetch(`/api/events?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          toast.success('Evento excluído com sucesso!');
          // Reset to first page after deletion
          setCurrentPage(1);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        toast.error(`Erro ao excluir evento: ${errorMessage}`);
      }
    }
  };

  const handleEdit = (event: FormDataProps) => {
    setEditingId(event.id);
    setEditForm({
      title: event.title,
      date: event.date,
      hour: event.hour,
      meeting_link: event.meeting_link,
      description: event.description,
      address: event.address || {
        cep: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: ''
      }
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch('/api/events', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingId, ...editForm })
      });

      if (res.ok) {
        toast.success('Evento atualizado com sucesso!');
        setEditingId(0);
        // Keep current page after update
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      toast.error(`Erro ao atualizar evento: ${errorMessage}`);
    }
  };

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
              {editingId === event.id ? (
                <div className='space-y-4'>
                  {/* Edit Form */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Título
                      </label>
                      <input
                        type='text'
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        className='w-full p-2 border rounded'
                      />
                    </div>
                    {/* Add other editable fields similarly */}
                  </div>
                  <div className='flex space-x-2 justify-end'>
                    <button
                      onClick={() => setEditingId(0)}
                      className='flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded'
                    >
                      <FiX className='mr-1' /> Cancelar
                    </button>
                    <button
                      onClick={handleUpdate}
                      className='flex items-center px-3 py-1 bg-amber-600 text-white rounded'
                    >
                      <FiCheck className='mr-1' /> Salvar
                    </button>
                  </div>
                </div>
              ) : (
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
                  <div className='flex space-x-2'>
                    <button
                      onClick={() => handleEdit(event)}
                      className='p-2 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded-full'
                      aria-label='Editar'
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className='p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full'
                      aria-label='Excluir'
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              )}
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
